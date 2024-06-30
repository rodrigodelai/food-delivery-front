import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BagProductComponent } from '../bag-product/bag-product.component';
import { MatIconModule } from '@angular/material/icon';
import { Order } from '../../../model/order';

@Component({
  selector: 'app-bag-product-list',
  standalone: true,
  imports: [BagProductComponent, MatIconModule],
  templateUrl: './bag-product-list.component.html',
  styleUrl: './bag-product-list.component.css'
})
export class BagProductListComponent {

  @Input() order!: Order;
  @Output() empty = new EventEmitter();
  @Output() more = new EventEmitter();
  @Output() add = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

}
