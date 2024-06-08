import { Location, NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-header',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.css'
})
export class ProductHeaderComponent {

  fontIcon: string;
  @Output() heart = new EventEmitter<boolean>()
  @Output() arrow = new EventEmitter()

  constructor() {
    this.fontIcon = "favorite_outline";
  }

  onArrow() {
    this.arrow.emit();
  }

  onHeart() {
    if (this.fontIcon === "favorite_outline") {
      this.fontIcon = "favorite";
      this.heart.emit(true);
    } else {
      this.fontIcon = "favorite_outline";
      this.heart.emit(false);
    }
  }

}
