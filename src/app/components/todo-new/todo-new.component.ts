import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todos.service';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo } from '../../models/todo';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-todo-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-new.component.html',
  styleUrl: 'todo-new.component.css',
})
export class TodoNewComponent {
  todosService = inject(TodosService);
  fb = inject(FormBuilder);

  newTodoForm = this.fb.group({
    // completed: new FormControl(false),
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    priority: new FormControl('low'),
    description: new FormControl(''),
  });

  onSubmit() {
    if (this.newTodoForm.invalid) return;

    console.log("submited");
    
    this.todosService
      .createTodo(this.newTodoForm.value as Todo)
      .pipe(
        take(1),
        tap(() => this.newTodoForm.reset({ title: '', description: '', priority: 'low' }))
      )
      .subscribe();
  }

  
}
