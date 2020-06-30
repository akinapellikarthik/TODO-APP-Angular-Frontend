import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TodoService } from '../todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-todo-confirmation',
  templateUrl: './delete-todo-confirmation.component.html',
  styleUrls: ['./delete-todo-confirmation.component.css']
})
export class DeleteTodoConfirmationComponent implements OnInit {
  msg: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoService: TodoService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  deleteTodo(id:number): void{
    console.log("in delete todo.dsfsf..."+id);
    this.todoService.deleteTodoById(id).subscribe(
      data=>{
        this.msg = data === true ? "Data Deleted Successfully": "Data is not deleted...";
        console.log(this.msg);
        this._snackBar.open(this.msg,'dismiss',{duration:5*1000});
      },
      err=>{
        console.log(err);
        this._snackBar.open(err,'dismiss',{duration:5*1000});
      }
    );
  }
}
