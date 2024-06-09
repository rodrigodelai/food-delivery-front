import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../model/product';
import { OptionsList } from '../../model/options-list';
import { OrderItem } from '../../model/order-item';

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

  agregateOptions(optionsList: OptionsList | undefined): string {
    if (optionsList) {
      let result = optionsList.name + ': ';

      optionsList.options.forEach((option) => {
        result += option.name + ', ';
      })
  
      return result.slice(0, -2);
    }

    return '';
  }

}
