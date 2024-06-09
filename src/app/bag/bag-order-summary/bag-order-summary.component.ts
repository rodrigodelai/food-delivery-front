import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bag-order-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './bag-order-summary.component.html',
  styleUrl: './bag-order-summary.component.css'
})
export class BagOrderSummaryComponent {

  @Input() subtotal!: number;
  @Input() deliveryFee!: number;
  @Input() taxes!: number;

}
