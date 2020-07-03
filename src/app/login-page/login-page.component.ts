import { Component, OnInit } from '@angular/core';
import { TodoUser } from '../todo-user';
import { TodoService } from '../todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoginSuccessComponent } from '../login-success/login-success.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  todoUser: TodoUser = {
    username: null,
    passwd: null
  };


  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log("log In button click...");
    this.todoService.authenticateUser(this.todoUser).subscribe(
      data => {
        console.log("data is:" + data);
        this._matDialog.open(LoginSuccessComponent, { data: { username: this.todoUser.username } });
        this._router.navigate(['todo-dashboard', { uname: this.todoUser.username }]);
      },
      err => {
        console.log("error is:" + err);
        this._snackBar.open('Either Username or password is invalid. Please check', 'dismiss', { duration: 5 * 1000 });
      }
    );
  }

}
