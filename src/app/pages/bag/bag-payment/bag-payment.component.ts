import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bag-payment',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './bag-payment.component.html',
  styleUrl: './bag-payment.component.css'
})
export class BagPaymentComponent {

  @Input() total!: number;
  @Input() sending!: boolean;
  @Output() submit = new EventEmitter();

  sendOrder() {
    this.submit.emit()
  }

}
