import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TODOSaveSuccessComponent } from '../todo-save-success/todo-save-success.component';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteTodoConfirmationComponent } from '../delete-todo-confirmation/delete-todo-confirmation.component';
import { EdittodoComponent } from '../edittodo/edittodo.component';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.css']
})
export class TodoDashboardComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  userName: string;
  badgeCount: Number;
  todoList: Todo[] = [{
    todoDescription: null, isDone: null, todo_date: null
  }];
  todoCols: string[] = ['ID', 'todoDescription', 'isDone', 'todo_date'];
  minDate: Date = new Date();
  todo: Todo = {
    todoDescription: null, isDone: null, todo_date: null
  };
  displayedColumns: string[] = ['id', 'todo-description', 'is-done', 'todo-date', 'edit', 'delete'];
  //todoList: Todo[];
  dataSource: any;
  //matdialogRef : MatDialogRef; 
  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _router: Router,
    private _activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.paginator
    this.userName = this._activatedRouter.snapshot.paramMap.get('uname');
    //console.log("this.username is:" + this.userName);
    this.todoService.todoNotCompletedCount().subscribe(
      data => { this.badgeCount = data },
      err => console.log(err)

    );

    this.refreshTodoData();
  }

  private refreshTodoData(todoList?: Todo[]) {
    console.log("in refresh method");
    if (todoList != undefined && todoList.length != 0) {
      this.dataSource = new MatTableDataSource(this.todoList);
      //this.dataSource.paginator = this.paginator;
    }

    else {
      this.todoService.todoList().subscribe(
        data => {
          this.todoList = data;
          this.dataSource = new MatTableDataSource(this.todoList);
          //this.dataSource.paginator = this.paginator;
        }
      );
    }


  }

  tabManager(tabChangeEvent: MatTabChangeEvent): void {

    if (tabChangeEvent.tab.textLabel.toLowerCase().includes('todo-logout-label')) {
      window.history.back();
      this._router.navigate(['login']);
    }
    console.log(tabChangeEvent.tab.textLabel.toLowerCase());
    if (tabChangeEvent.tab.textLabel.toLowerCase().includes('todo-list-label')) {
      this.refreshTodoData();
    }


  }

  loadData(): void {
    this.todoService.todoList().subscribe(
      data => {
        this.todoList = data;
        //this.dataSource = new MatTableDataSource(this.todoList);
        //console.table(this.todoList);
      },
      err => {
        console.log(err);
      }
    );
  }



  todoSaves(): void {
    this.todo.isDone = false;
    this.todoService.saveTodo(this.todo).subscribe(
      data => {
        this._matDialog.open(TODOSaveSuccessComponent,
          {
            data:
            {
              todoDescription: data.todoDescription,
              isDone: data.isDone,
              todo_date: data.todo_date
            }
          }


        )
      },
      err => {
        this._snackBar.open('Error in saving TODO Data', 'Dismiss', { duration: 5 * 1000 });
      }
    );
  }

  deleteTodo(id: number): void {
    console.log("in delete todo.. todo-dashboard:" + id);
    this._matDialog.open(DeleteTodoConfirmationComponent, { data: { todo_id: id } });
    console.log("post delete...");
    this.refreshTodoData();
  }

  editTodo(todo: Todo): void {
    console.log("in edit todo.. click");
    console.log(todo);
    this._matDialog.open(EdittodoComponent, {
      data:
      {
        todoDescription: todo.todoDescription,
        todo_date: todo.todo_date,
        isDone: todo.isDone,
        id: todo.id
      }
    });
    this.refreshTodoData();
  }

  sortData(sort: Sort): void {
    console.log(sort);
    this.todoList = this.todoList.sort((_a, _b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'todo_id': return this.compare(_a.id, _b.id, isAsc);
        case 'todo_desc': return this.compare(_a.todoDescription, _b.todoDescription, isAsc);
        case 'todo_is_done': return this.compare(_a.isDone, _b.isDone, isAsc);
        case 'todo_date': return this.compare(_a.todo_date, _b.todo_date, isAsc);
        default: return 0;
      }
    });
    //console.table(this.todoList);
    this.refreshTodoData(this.todoList);
  }

  compare(a: number | string | Date | Boolean, b: number | string | Date | Boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
/*
export class UserDataSource extends DataSource<any> {
  constructor(private todoService: TodoService) {
    super();
  }
  connect(): Observable<Todo[]> {
    return this.todoService.todoList();
  }
  disconnect() { }
}*/