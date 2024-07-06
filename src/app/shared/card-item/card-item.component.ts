import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from '../../services/favorites.service';
import { environment } from '../../../environments/environment';
import { OrderService } from '../../services/order.service';
import { Product } from '../../model/product';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [MatIconModule, NgClass, CurrencyPipe, NgClass],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent {

  fontIcon: string;
  @Input() product: Product;
  @Output() heart: EventEmitter<number>
  @Output() addToBag: EventEmitter<number>
  readonly API_URL = environment.apiUrl + 'image/';

  constructor(
    private favoritesService: FavoritesService,
    private orderService: OrderService
  ) {
    this.fontIcon = 'favorite_outline';
    this.product = {
      id: 0,
      name: 'Name',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
      imageName: '',
      price: 0,
    };
    this.heart = new EventEmitter<number>();
    this.addToBag = new EventEmitter<number>();
  }

  ngOnInit() {
    this.fontIcon = this.favoritesService.isFavorite(this.product.id ?? 0)
      ? 'favorite'
      : 'favorite_outline';
  }

  onHeart(event: Event) {
    event.stopPropagation();

    if (this.fontIcon === 'favorite_outline') {
      this.fontIcon = 'favorite';
      this.favoritesService.addFavorite(this.product.id ?? 0);
    } 
    else {
      this.fontIcon = 'favorite_outline';
      this.favoritesService.removeFavorite(this.product.id ?? 0);
    }

    this.heart.emit(this.product.id ?? 0);
  }

  onAddToBag(event: Event) {
    event.stopPropagation();

    this.orderService.createOrderIfDoesntExist();
    this.orderService.createItemIfDoesntExist(this.product);
    this.orderService.addItemToOrder();

    MenuBarComponent.badgeCounter += 1;

    this.addToBag.emit(this.product.id ?? 0);
  }
}
