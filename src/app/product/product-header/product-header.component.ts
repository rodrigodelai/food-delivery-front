import { Location, NgClass } from '@angular/common';
import { Component } from '@angular/core';
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

  constructor(private location: Location) {
    this.fontIcon = "favorite_outline";
  }

  onArrow() {
    this.location.back();
  }

  onHeart() {
    if (this.fontIcon === "favorite_outline") {
      this.fontIcon = "favorite";
      
      // TO-DO: add id product to users favorite list
    } else {
      this.fontIcon = "favorite_outline";
      // TO-DO: remove id product from users favorite list
    }
  }

}
