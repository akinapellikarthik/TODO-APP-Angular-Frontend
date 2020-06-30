import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import { DeleteTodoConfirmationComponent } from '../delete-todo-confirmation/delete-todo-confirmation.component';
import { EdittodoComponent } from '../edittodo/edittodo.component';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.css']
})
export class TodoDashboardComponent implements OnInit {

  todoList: Todo[] = [{
    //todoDescription: null, isDone: null, todo_date: null
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
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource = new UserDataSource(this.todoService);
    this.todoService.todoList().subscribe(
      data => {
        console.log("data loaded");
        console.table(data);
        this.todoList = data;
        this.dataSource = new MatTableDataSource(this.todoList);
      }
    );
  }

  tabManager(tabChangeEvent: MatTabChangeEvent): void {

    if (tabChangeEvent.tab.textLabel.toLowerCase().includes('todo-logout-label')) {
      window.history.back();
      this._router.navigate(['login']);
    }


  }

  loadData(): void {
    this.todoService.todoList().subscribe(
      data => {
        this.todoList = data;
        //this.dataSource = new MatTableDataSource(this.todoList);
        console.table(this.todoList);
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
    })
  }

}
export class UserDataSource extends DataSource<any> {
  constructor(private todoService: TodoService) {
    super();
  }
  connect(): Observable<Todo[]> {
    return this.todoService.todoList();
  }
  disconnect() { }
}