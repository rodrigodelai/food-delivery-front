import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OrderItem } from '../../../model/order-item';
import { OrderOptionsList } from '../../../model/order-options-list';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-bag-product',
  standalone: true,
  imports: [CurrencyPipe, MatIconModule, NgClass],
  templateUrl: './bag-product.component.html',
  styleUrl: './bag-product.component.css'
})
export class BagProductComponent {

  @Input() item!: OrderItem;
  @Input() index!: number;
  @Output() add = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  readonly API_URL = environment.apiUrl + 'image/';

  agregateOptions(orderOptionsList: OrderOptionsList | undefined): string {
    if (orderOptionsList) {
      let result = orderOptionsList.name + ': ';

      orderOptionsList.orderOptions.forEach((orderOption) => {
        result += orderOption.option.name + ', ';
      })
  
      return result.slice(0, -2);
    }

    return '';
  }

}
