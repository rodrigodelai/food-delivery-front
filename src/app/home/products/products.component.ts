import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import { Product } from '../../model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  @Input() products!: Product[];
  @Output() card: EventEmitter<number>;

  constructor() {
    this.card = new EventEmitter<number>();
  }

  onCardItem(id: number) {
    this.card.emit(id);
  }

}
