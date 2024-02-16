import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: 'todo-list.component.css'
})
export class TodoListComponent {
  @Input({ required: true }) todos!: Todo[];
}
