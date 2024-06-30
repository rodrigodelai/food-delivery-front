import { Component, inject } from '@angular/core';
import { MenuBarComponent } from '../shared/menu-bar/menu-bar.component';
import { BagDeliveryComponent } from './bag-delivery/bag-delivery.component';
import { BagProductListComponent } from './bag-product-list/bag-product-list.component';
import { BagOrderSummaryComponent } from './bag-order-summary/bag-order-summary.component';
import { BagPaymentComponent } from './bag-payment/bag-payment.component';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order';
import { Router } from '@angular/router';
import { DialogDataOptions } from '../model/dialog-data';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, catchError } from 'rxjs';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';


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

  constructor(
    private orderService: OrderService,
    private dialogService: ConfirmationDialogService,
    private router: Router,
    private snackBar: MatSnackBar 
  ) {
    this.order = this.orderService.getOrder();
  }

  private functionMap = new Map<string, Function>([
    ['sendOrder', this.sendOrder.bind(this)],
    ['emptyBag', this.emptyBag.bind(this)],
    ['deleteItem', this.orderService.deleteItemWithoutContext.bind(this)],
    ['', (() => {}).bind(this)]
  ]);

  onSubmit() {
    if (!this.order.items.length)
      this.snackBar.open('Sua sacola está vazia.', '✖', { duration: 7000 });
    else
      this.dialogService.openDialog('200ms', '100ms', DialogDataOptions.SEND_ORDER, this.functionMap);
  }

  onEmptyBag() {
    this.dialogService.openDialog('200ms', '100ms', DialogDataOptions.EMPTY_BAG, this.functionMap);
  }

  getTotal() {
    return this.order.subtotal + this.order.deliveryFee + this.order.taxes;
  }

  sendOrder() {
    this.orderService.sendOrder()
    .pipe(catchError(() => {
      this.snackBar.open('Houve um problema na comunicação com o servidor. Tente novamente mais tarde.', '✖', { duration: 7000 })
      return EMPTY;
    }))
    .subscribe((response) => {
      this.snackBar.open('Seu pedido foi enviado com sucesso!', '✖', { duration: 7000 });
      this.orderService.saveOrder(response.id);
      this.router.navigate(['/orders']);
      this.orderService.emptyBag();
      this.order = this.orderService.getOrder();
    });
  }

  emptyBag() {
    this.orderService.emptyBag();
    this.order = this.orderService.getOrder();
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
      const dialogRef = this.dialogService.openDialog('200ms', '100ms', DialogDataOptions.DELETE_ITEM, this.functionMap, { index: index, service: this.orderService });
      
      dialogRef.afterClosed().subscribe(() => {
        this.order = this.orderService.getOrder();
      })
    }
    else 
      this.orderService.updateItem(item, index);

    this.order = this.orderService.getOrder();
  }

}
