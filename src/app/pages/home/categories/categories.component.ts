import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { Category } from '../../../model/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgClass],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  @Input() categories!: Category[];
  selectedCategory!: number;
  @Output() selected!: EventEmitter<number>;

  constructor() {
    this.selectedCategory = 0;
    this.selected = new EventEmitter<number>;
  }

  onCategory(index: number, event: MouseEvent) {
    this.scrollAndCentralizeElement(event);
    this.selectedCategory = index;
    this.selected.emit(index);
  }
  
  private scrollAndCentralizeElement(event: MouseEvent) {
    const li = event.target as HTMLElement;
    const ul = li.parentElement as HTMLElement;

    const liOffsetLeft = li.getBoundingClientRect().left - ul.getBoundingClientRect().left + ul.scrollLeft;
    const scrollPosition = liOffsetLeft - (ul.offsetWidth / 2) + (li.offsetWidth / 2);

    ul.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }
}