import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [MatIconModule, NgClass, CurrencyPipe],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {

  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() price: number;
  @Input() promoPrice?: number;
  fontIcon: string;

  constructor() {
    this.id = 0;
    this.name = "Name";
    this.description = "Description";
    this.price = 0;
    this.fontIcon = "favorite_outline";
  }

  onHeart(event: Event) {
    event.stopPropagation();
    if (this.fontIcon === "favorite_outline") {
      this.fontIcon = "favorite";
      
      // TO-DO: add id product to users favorite list
    } else {
      this.fontIcon = "favorite_outline";
      // TO-DO: remove id product from users favorite list
    }
  }
}
