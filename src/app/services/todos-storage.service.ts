import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosStorageService {
  http = inject(HttpClient);
  apiUrl="http://localhost:5000/todo/"

 // private starterDataSource = '../../assets/data/data.json';
  //private dataKey = 'todos';

  // get todosSource() {
  //   const todos = localStorage.getItem(this.dataKey);

  //   return todos !== null
  //     ? of(JSON.parse(todos) as Todo[])
  //     : this.http.get<Todo[]>(this.starterDataSource);
  // }

  // getTodos(): Observable<Todo[]> {
  //   return this.todosSource.pipe(
  //     tap((todos) => localStorage.setItem(this.dataKey, JSON.stringify(todos)))
  //   );
  // }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // createTodo(todo: Todo): Observable<Todo> {
  //   return this.todosSource.pipe(
  //     map((todos) => {
  //       const newTodo: Todo = {
  //         ...todo,
  //       };
  //       localStorage.setItem(this.dataKey, JSON.stringify([...todos, newTodo]));
  //       return newTodo;
  //     })
  //   );
  // }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  // updateTodo(todo: Todo): Observable<Todo> {
  //   return this.todosSource.pipe(
  //     map((todos) => {
  //       console.log('todo: ', todo);
  //       localStorage.setItem(
  //         this.dataKey,
  //         JSON.stringify(todos.map((t) => (t.id === todo.id ? todo : t)))
  //       );
  //       return todo;
  //     })
  //   );
  // }

  updateTodo(todo: Todo): Observable<Todo> {

    return this.http.put<Todo>(this.apiUrl + todo.id, todo,{headers: {'Content-Type': 'application/json'}});
  }

  changeCompletedStatus(id:string):Observable<Todo>
  {
    return this.http.put<Todo>(this.apiUrl +'completed/' + id, {}, { headers: { 'Content-Type': 'application/json' } });

  }


  // deleteTodo(id: number): Observable<Todo> {
  //   return this.todosSource.pipe(
  //     map((todos) => {
  //       const deleted: Todo = todos[id - 1];
  //       localStorage.setItem(
  //         this.dataKey,
  //         JSON.stringify(todos.filter((t) => t.id !== id))
  //       );
  //       return deleted;
  //     })
  //   );
  // }

  deleteTodo (id: string): Observable<any> {
    return this.http.delete<Todo>(this.apiUrl + id);
  }

  markTodoAsCompleted(id:string): Observable<Todo> {
    return this.http.put<Todo>(this.apiUrl +'completed/'+ id, {});
  }

  clearCompletedTodo() :Observable<any>{
    return this.http.delete<Todo>(this.apiUrl + 'completed');
  }

}
