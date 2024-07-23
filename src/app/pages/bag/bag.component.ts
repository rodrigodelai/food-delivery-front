import { Component, ViewChild } from '@angular/core';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { BagDeliveryComponent } from './bag-delivery/bag-delivery.component';
import { BagProductListComponent } from './bag-product-list/bag-product-list.component';
import { BagOrderSummaryComponent } from './bag-order-summary/bag-order-summary.component';
import { BagPaymentComponent } from './bag-payment/bag-payment.component';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/order';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { DIALOG_DATA } from '../../model/dialog-data';
import { SnackbarService } from '../../services/snackbar.service';
import { SNACKBAR_DATA } from '../../model/snackbar-data';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [
    BagDeliveryComponent,
    BagProductListComponent,
    BagOrderSummaryComponent,
    BagPaymentComponent,
    MenuBarComponent,
    PageHeaderComponent
  ],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css',
})
export class BagComponent {

  order!: Order;
  sending: boolean;

  @ViewChild(MenuBarComponent) menuBar!: MenuBarComponent;

  constructor(
    private orderService: OrderService,
    private dialogService: ConfirmationDialogService,
    private router: Router,
    private snackbarService: SnackbarService 
  ) {
    this.order = this.orderService.getOrder();
    this.sending = false;
  }

  onSubmit() {
    if (!this.order.items.length)
      this.snackbarService.open(SNACKBAR_DATA['EMPTY_BAG']);
    else if (this.sending)
      this.snackbarService.open(SNACKBAR_DATA['SENDING']);
    else {
      this.dialogService
        .open(DIALOG_DATA['SEND_ORDER'])
        .afterClosed()
        .subscribe((confirmation: boolean) => {
          if (confirmation) 
            this.sendOrder();
      });
    }
  }

  onEmptyBag() {
    this.dialogService
      .open(DIALOG_DATA['EMPTY_BAG'])
      .afterClosed()
      .subscribe((confirmation: boolean) => {
        if (confirmation) 
          this.emptyBag();
      });
  }

  getTotal() {
    return this.order.subtotal + this.order.deliveryFee + this.order.taxes;
  }

  sendOrder() {
    this.sending = true;
    this.orderService.sendOrder()
    .pipe(catchError(() => {
      this.dialogService.open(DIALOG_DATA['UNAVAILABLE']);
      this.sending = false;
      return EMPTY;
    }))
    .subscribe((response) => {
      this.snackbarService.open(SNACKBAR_DATA['SUCCESS']);
      this.orderService.saveOrder(response.id);
      this.router.navigate(['/orders']);
      this.emptyBag();
    });
  }

  emptyBag() {
    this.orderService.emptyBag();
    this.order = this.orderService.getOrder();
    this.menuBar.hide = false;
    MenuBarComponent.clear();
  }

  sendToHome() {
    this.router.navigate(['/home']);
  }

  addItem(index: number) {
    const item = this.order.items[index];
    item.quantity += 1;
    this.orderService.updateItem(item, index);
    this.order = this.orderService.getOrder();
  }

  removeItem(index: number) {
    const item = this.order.items[index];
    item.quantity -= 1;

    if (item.quantity === 0) {
      item.quantity += 1;

      this.dialogService
        .open(DIALOG_DATA['DELETE_ITEM'])
        .afterClosed()
        .subscribe((confirmation: boolean) => {
          if (confirmation) {
            this.orderService.deleteItem(index);
            this.order = this.orderService.getOrder();
            MenuBarComponent.badgeCounter -= 1;
          }
        });
    }
    else 
      this.orderService.updateItem(item, index);

    this.order = this.orderService.getOrder();
  }

}
