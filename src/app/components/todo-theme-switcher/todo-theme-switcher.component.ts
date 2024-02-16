import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-theme-switcher.component.html',
  styleUrl: './todo-theme-switcher.component.css'
})
export class TodoThemeSwitcherComponent {
  theme = signal<Theme>(
    (localStorage.getItem('theme') as Theme) ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark-mode'
      : 'light-mode'
  );

  constructor() {
    effect(() => {
      if (this.theme() === 'light-mode') {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      }

      if (this.theme() === 'dark-mode') {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark-mode');
      }

      localStorage.setItem('theme', this.theme());
    });
  }

  toggleTheme() {
    this.theme.update((theme) =>
      theme === 'dark-mode' ? 'light-mode' : 'dark-mode'
    );
  }
}

type Theme = 'light-mode' | 'dark-mode';
