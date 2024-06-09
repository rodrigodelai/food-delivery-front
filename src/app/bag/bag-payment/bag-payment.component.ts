import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bag-payment',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './bag-payment.component.html',
  styleUrl: './bag-payment.component.css'
})
export class BagPaymentComponent {

  @Input() total!: number;
  @Output() submit = new EventEmitter();

  sendOrder() {
    this.submit.emit()
  }
}
