import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginSuccessComponent } from './login-success/login-success.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    //do nothing
  }

  constructor(private matDialog: MatDialog) { }
  title = 'todoapp-using-angular-mat';

  openDialog() {
    console.log("button clicked");
    this.matDialog.open(LoginSuccessComponent, { data: { username: 'karthik' } });
  }
}
