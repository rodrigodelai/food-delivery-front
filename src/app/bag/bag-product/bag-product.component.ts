import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bag-product',
  standalone: true,
  imports: [CurrencyPipe, MatIconModule],
  templateUrl: './bag-product.component.html',
  styleUrl: './bag-product.component.css'
})
export class BagProductComponent {

  title: string;
  optionals: string[];
  price: number;
  promoPrice?: number;

  constructor() {
    this.title = 'Top Cheddar';
    this.optionals = ['Adicionais: Bacon, Maionese', 'Observações: '];
    this.price = 10.99;
    this.promoPrice = this.price - 1.99;
  }

}
