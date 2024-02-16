import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: 'todo-item.component.css',
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;

  todosService = inject(TodosService);
  isEditMode: boolean = false;
  priority: string = 'low';

  changeCompletedStatus() {
    this.todosService.changeCompletedStatus(this.todo.id!).subscribe();
  }

  deleteTodo() {
    this.todosService.deleteTodo(this.todo.id!).subscribe();
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'low':
        return 'low-priority';
      case 'medium':
        return 'medium-priority';
      case 'high':
        return 'high-priority';
      default:
        return 'low-priority';
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  updateTodo() {
    this.todosService.updateTodo(this.todo).subscribe(
      ()=>
      {
        this.toggleEditMode();
      }
    )
  }
}

