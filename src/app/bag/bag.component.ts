import { Component } from '@angular/core';
import { MenuBarComponent } from '../shared/menu-bar/menu-bar.component';
import { BagDeliveryComponent } from './bag-delivery/bag-delivery.component';
import { BagProductListComponent } from './bag-product-list/bag-product-list.component';
import { BagOrderSummaryComponent } from './bag-order-summary/bag-order-summary.component';
import { BagPaymentComponent } from './bag-payment/bag-payment.component';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [BagDeliveryComponent, BagProductListComponent, BagOrderSummaryComponent, BagPaymentComponent, MenuBarComponent],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css'
})
export class BagComponent {

}
