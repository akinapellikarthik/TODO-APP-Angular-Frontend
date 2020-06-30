import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { TodoDashboardComponent } from './todo-dashboard/todo-dashboard.component';
import { TODOListComponent } from './todolist/todolist.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'todo-dashboard', component: TodoDashboardComponent },
  { path: 'todo-list', component: TODOListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
