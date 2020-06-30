import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { MatTableDataSource } from '@angular/material/table';
import { Todo } from '../todo';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TODOListComponent implements OnInit {

  displayedColumns: string[] = ['id','todo-description','is-done','todo-date'];
  todoList: Todo[];
  dataSource: any;
  
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.todoList().subscribe(
      data=>{
        console.log("data loaded");
        console.table(data);
        this.todoList = data;
        this.dataSource = new MatTableDataSource(this.todoList);
      }
    );
  }

}
