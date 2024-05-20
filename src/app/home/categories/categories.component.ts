import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: string[];

  constructor() {
    this.categories = ['promoções', 'clássicos', 'especiais', 'combos', 'acompanhamentos', 'bebidas']
  }
}
