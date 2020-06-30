import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edittodo',
  templateUrl: './edittodo.component.html',
  styleUrls: ['./edittodo.component.css']
})
export class EdittodoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public editTodoData: any,
    private todoServices: TodoService,
    private _snackBar: MatSnackBar
  ) { }
  todo: Todo = {
    todoDescription: null,
    isDone: null,
    todo_date: null
  };
  ngOnInit(): void {

  }

  saveEditedTodo(): void {
    this.todo = this.editTodoData as Todo;
    console.log(this.todo);
    this.todoServices.updateTodo(this.todo).subscribe(
      data => {
        console.log("no of rows updated is:" + data);
        this._snackBar.open("Data updated successfully", "dismiss", { duration: 2 * 1000 });
        
      }
      ,
      err => {
        console.log("No rows updated due to error");
        this._snackBar.open("Data didn't updated due to error" + err, "dismiss", { duration: 5 * 1000 })
      }
    )
  }
  isDone(event: MatSlideToggleChange): void {
    event.checked === true ? this.editTodoData.isDone = true : this.editTodoData.isDone = false;
  }
}
