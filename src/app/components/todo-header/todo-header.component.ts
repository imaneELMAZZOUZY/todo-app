import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoThemeSwitcherComponent } from '../todo-theme-switcher/todo-theme-switcher.component';

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [CommonModule, TodoThemeSwitcherComponent],
  templateUrl: './todo-header.component.html',
  styleUrl: 'todo-header.component.css',
  })
export class TodoHeaderComponent { }
