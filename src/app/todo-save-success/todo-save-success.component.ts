import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-save-success',
  templateUrl: './todo-save-success.component.html',
  styleUrls: ['./todo-save-success.component.css']
})
export class TODOSaveSuccessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
