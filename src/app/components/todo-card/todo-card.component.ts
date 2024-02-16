import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoHeaderComponent } from '../todo-header/todo-header.component';
import { TodoNewComponent } from '../todo-new/todo-new.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoOptionsComponent } from '../todo-options/todo-options.component';
import { TodosService } from '../../services/todos.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    CommonModule,
    TodoHeaderComponent,
    TodoNewComponent,
    TodoListComponent,
    TodoOptionsComponent,
  ],
  templateUrl: './todo-card.component.html',
  styleUrl: 'todo-card.component.css',
})
export class TodoCardComponent implements OnInit {
  todosService = inject(TodosService);

  get todos() {
    console.log(this.todosService.todos())
    return this.todosService.todos;
  }

  get listOfTodos() {
    console.log(this.todosService.filteredTodos())
    return this.todosService.filteredTodos;
  }

  get numberOfTodosLeft() {
    console.log(this.todosService.numberOfTodosLeft())
    return this.todosService.numberOfTodosLeft;
  }

  ngOnInit(): void {

    this.todosService.getTodos().subscribe();

  }


}
