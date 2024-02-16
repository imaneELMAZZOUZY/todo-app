import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoCardComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: 'app.component.css',
})
export class AppComponent { }
