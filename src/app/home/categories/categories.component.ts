import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ShortCategory } from '../../model/short-category';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgClass],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories!: ShortCategory[];
  selectedCategory: number;
  @Output() selected!: EventEmitter<number>;

  constructor(service: CategoryService) {
    this.selectedCategory = 1;
    service.list().subscribe(v => this.categories = v);
    this.selected = new EventEmitter<number>;
  }

  onCategory(id: number, event: MouseEvent) {
    this.scrollAndCentralizeElement(event);
    this.selectedCategory = id;
    this.selected.emit(id);
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