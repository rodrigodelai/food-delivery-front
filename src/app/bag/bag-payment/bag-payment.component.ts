import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bag-payment',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './bag-payment.component.html',
  styleUrl: './bag-payment.component.css'
})
export class BagPaymentComponent {

}
