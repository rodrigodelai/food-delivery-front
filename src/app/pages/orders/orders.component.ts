import { Component } from '@angular/core';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { Order } from '../../model/order';
import { OrderService } from '../../services/order.service';
import { CardOrderComponent } from './card-order/card-order.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MenuBarComponent, PageHeaderComponent, CardOrderComponent, MatProgressSpinnerModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders!: Order[];

  constructor(private orderService: OrderService, private snackBar: MatSnackBar) {
    this.orderService.getHistory().subscribe(history => this.orders = history);
  }

  onAddToBag(index: number) {
    this.orders[index].items.forEach(item => {
      delete item.id;
      this.orderService.addOrderItem(item);
    })
    MenuBarComponent.badgeCounter += this.orders[index].items.length;
    // this.snackBar.open('Itens adicionados à sacola', '✖', { duration: 7000 });
  }

}
