import { Location, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from '../../services/favorites.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-product-header',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.css'
})
export class ProductHeaderComponent {

  fontIcon: string;
  @Input() productId: number
  @Input() isFavorite: boolean;
  @Output() heart = new EventEmitter<boolean>()
  @Output() arrow = new EventEmitter()

  constructor() {
    this.fontIcon = "favorite_outline";
    this.productId = 1;
    this.isFavorite = false;
  }

  ngOnChanges() {
    this.fontIcon = this.isFavorite ? "favorite" : "favorite_outline";
  }

  onArrow() {
    this.arrow.emit();
  }

  onHeart() {
    this.isFavorite = !this.isFavorite;
    this.fontIcon = this.isFavorite ? "favorite" : "favorite_outline";
    this.heart.emit(this.isFavorite);
  }

}
