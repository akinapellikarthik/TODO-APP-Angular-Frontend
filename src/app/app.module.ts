import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoDashboardComponent } from './todo-dashboard/todo-dashboard.component';
import { TODOSaveSuccessComponent } from './todo-save-success/todo-save-success.component';
import { TODOListComponent } from './todolist/todolist.component';
import { DeleteTodoConfirmationComponent } from './delete-todo-confirmation/delete-todo-confirmation.component';
import { EdittodoComponent } from './edittodo/edittodo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginSuccessComponent,
    LoginPageComponent,
    TodoDashboardComponent,
    TODOSaveSuccessComponent,
    TODOListComponent,
    DeleteTodoConfirmationComponent,
    EdittodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [LoginSuccessComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
