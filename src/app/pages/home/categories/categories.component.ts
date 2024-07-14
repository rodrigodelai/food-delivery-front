import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { NgClass } from '@angular/common';
import { Category } from '../../../model/category';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgClass, MatProgressSpinnerModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements AfterViewInit {

  @Input() categories!: Category[];
  @Input() selectedCategoryIndex!: number;
  @Output() selected: EventEmitter<number>;

  @ViewChildren('listItem') listItems!: QueryList<ElementRef>;

  constructor() {
    this.selected = new EventEmitter<number>;
  }

  ngAfterViewInit() {
    if (this.selectedCategoryIndex)
      this.onCategoryByIndex(this.selectedCategoryIndex);
  }

  onCategory(index: number, event: MouseEvent) {
    this.scrollAndCentralizeElement(event.target as HTMLLIElement);
    this.selected.emit(index);
  }

  onCategoryByIndex(index: number) {
    this.scrollAndCentralizeElement(this.listItems.get(index)?.nativeElement, false);
    this.selected.emit(index);
  }

  private scrollAndCentralizeElement(element: HTMLLIElement, smooth: boolean = true) {
    const li = element;
    const ul = li.parentElement as HTMLUListElement;

    const liOffsetLeft = li.getBoundingClientRect().left - ul.getBoundingClientRect().left + ul.scrollLeft;
    const scrollPosition = liOffsetLeft - (ul.offsetWidth / 2) + (li.offsetWidth / 2);

    ul.scrollTo({
      left: scrollPosition,
      behavior: smooth ? 'smooth' : 'instant'
    });
  }
}