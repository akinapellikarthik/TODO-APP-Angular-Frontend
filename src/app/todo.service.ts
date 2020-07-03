import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoUser } from './todo-user';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoBackendBaseUrl: string = 'http://localhost:9696/v1/api'

  constructor(private http: HttpClient) { }

  authenticateUser(todoUser: TodoUser): Observable<Boolean> {
    return this.http.post<Boolean>(this.todoBackendBaseUrl + '/authenticateUser', todoUser);
  }

  todoList(): Observable<Todo[]> {
    console.log("todo list");
    return this.http.get<Todo[]>(this.todoBackendBaseUrl + '/todos');
  }

  saveTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todoBackendBaseUrl + '/todo', todo);
  }

  deleteTodoById(todoId: number): Observable<Boolean> {
    let params = new HttpParams().set('id', new String(todoId).toString());
    return this.http.delete<Boolean>(this.todoBackendBaseUrl + '/todo', { params: params });
  }

  updateTodo(todo: Todo): Observable<Number>{
    return this.http.put<Number>(this.todoBackendBaseUrl+'/todo',todo);
  }

  todoNotCompletedCount(): Observable<Number>{
    return this.http.get<Number>(this.todoBackendBaseUrl+'/todoNotCompletedCount');
  }
}
