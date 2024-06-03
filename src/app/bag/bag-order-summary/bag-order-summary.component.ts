import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bag-order-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './bag-order-summary.component.html',
  styleUrl: './bag-order-summary.component.css'
})
export class BagOrderSummaryComponent {

  subtotal: number;
  deliveryFee: number;
  taxes: number;

  constructor() {
    this.subtotal = 10.99;
    this.deliveryFee = 3;
    this.taxes = .5;
  }

}
