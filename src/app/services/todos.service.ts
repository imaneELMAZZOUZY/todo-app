import { Injectable, computed, inject, signal } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, from, mergeMap, tap } from 'rxjs';
import { TodoOption } from '../models/todo-option';
import { TodosStorageService } from './todos-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosStorage = inject(TodosStorageService);

  todos = signal<Todo[]>([]);
  selectedOption = signal<TodoOption>('all');

  filteredTodos = computed(() => {
    switch (this.selectedOption()) {
      case 'all':
        return this.todos();
      case 'uncompleted':
        return this.todos().filter((todo) => !todo.completed);
      case 'completed':
        return this.todos().filter((todo) => todo.completed);
    }
  });

  numberOfTodosLeft = computed(
    () => this.todos().filter((todo) => !todo.completed).length
  );

  getTodos(): Observable<Todo[]> {
    return this.todosStorage.getTodos().pipe(
      tap((res: any) => {
        const todos = res.data.map((todoData: any) => ({
          id: todoData.id,
          title: todoData.title,
          description: todoData.description,
          priority: todoData.priority,
          completed: todoData.completed,
          date_added: new Date(todoData.date_added)
        }));
        this.todos.set(todos);
      })
    );
  }

  createTodo(todo: Todo): Observable<Todo> {
    // console.log(todo)
    // const todoWithDate = {
    //   ...todo,
    //   date: new Date()
    // };

    // console.log(todoWithDate)

    return this.todosStorage
      .createTodo(todo)
      .pipe(
        tap((newTodo: Todo) => {
          this.todos.update((todos) => [...todos, newTodo]);
          console.log(newTodo); // Log the newTodo to the console
        })
      );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.todosStorage
      .updateTodo(todo)
      .pipe(
        tap((updatedTodo) =>
          this.todos.update((todos) =>
            todos.map((t) => (t.id === todo.id ? updatedTodo : t))
          )
        )
      );
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.todosStorage
      .deleteTodo(id)
      .pipe(
        tap(() =>
          this.todos.update((todos) => todos.filter((todo) => todo.id !== id))
        )
      );
  }

  changeCompletedStatus(id:string):Observable<Todo>
  {
    return this.todosStorage
      .changeCompletedStatus(id)
      .pipe(
        tap((updatedTodo) =>
          this.todos.update((todos) =>
            todos.map((t) => (t.id === updatedTodo.id ? { ...t, completed: !t.completed } : t))
          )
        )
      );
  }

  clearCompletedTodo() {
    return this.todosStorage.clearCompletedTodo().pipe(
      tap(() =>
        this.todos.update((todos) => todos.filter((todo) => !todo.completed))
      )
    );
  }


  selectTodoOption(todoOption: TodoOption) {
    if (this.selectedOption() === todoOption) return;

    this.selectedOption.set(todoOption);
  }


}
