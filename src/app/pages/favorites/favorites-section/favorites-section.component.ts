import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardItemComponent } from '../../../shared/card-item/card-item.component';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-favorites-section',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './favorites-section.component.html',
  styleUrl: './favorites-section.component.css'
})
export class FavoritesSectionComponent {

  @Input() name!: string;
  @Input() products!: Product[];
  @Output() card: EventEmitter<number>;
  @Output() heart: EventEmitter<void>;
  @Output() addToBag: EventEmitter<number>;

  constructor() {
    this.card = new EventEmitter<number>();
    this.heart = new EventEmitter<void>();
    this.addToBag = new EventEmitter<number>();
  }

  onCardItem(id: number) {
    this.card.emit(id);
  }

  onHeart() {
    this.heart.emit();
  }

  onAddToBag(id: number) {
    this.addToBag.emit(id);
  }

}
