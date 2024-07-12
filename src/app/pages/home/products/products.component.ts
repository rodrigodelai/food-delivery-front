import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardItemComponent } from '../../../shared/card-item/card-item.component';
import { Product } from '../../../model/product';

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
  @Output() addToBag: EventEmitter<number>;

  constructor() {
    this.card = new EventEmitter<number>();
    this.addToBag = new EventEmitter<number>();
  }

  onCardItem(id: number) {
    this.card.emit(id);
  }

  onAddToBag(id: number) {
    this.addToBag.emit(id);
  }
    
}
