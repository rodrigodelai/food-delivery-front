import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../model/order';
import { OrderOptionsList } from '../../model/order-options-list';
import { OrderDatePipe } from '../../pipes/order-date.pipe';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { toggleAnimation } from '../../animations/toggle';
import { fadeAnimation } from '../../animations/fade';
import { distanceAnimation } from '../../animations/distance';
import { OrderItem } from '../../model/order-item';

@Component({
  selector: 'app-card-order',
  standalone: true,
  imports: [OrderDatePipe, MatIcon, NgStyle, CurrencyPipe, NgClass],
  animations: [toggleAnimation, fadeAnimation, distanceAnimation],
  templateUrl: './card-order.component.html',
  styleUrl: './card-order.component.css'
})
export class CardOrderComponent {

  seeMore: boolean;
  seeMoreText: string;
  @Input() order!: Order;
  @Input() index!: number;
  @Output() add: EventEmitter<number>

  constructor() {
    this.seeMore = false;
    this.seeMoreText = 'Ver mais';
    this.add = new EventEmitter<number>();
  }

  hasAditionalInfo(orderOptionsLists?: OrderOptionsList[]): boolean {
    if (orderOptionsLists)
      return orderOptionsLists.length > 0;

    return false;
  }

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

  agregateOptionsPrices(orderOptionsList: OrderOptionsList | undefined): number {
    if (orderOptionsList) {
      let result = 0;

      orderOptionsList.orderOptions.forEach((orderOption) => {
        result += orderOption.option.price * orderOption.quantity;
      })
  
      return result;
    }

    return 0;
  }

  onSeeMore() {
    this.seeMore = !this.seeMore;
    this.seeMoreText = this.seeMore ? 'Ver menos' : 'Ver mais';
  }

  onAddToBag(index: number) {
    this.add.emit(index);
  }

  getFadingStyle(index: number) {
    if (this.seeMore)
      return undefined;

    switch (index) {
      case 1: return { color: '#00000080' };
      case 2: return { color: '#00000033' };
      default: return undefined;
    }
  }

  distanceControl(item: OrderItem) {
    return !item.notes?.length && !item.orderOptionsLists?.length && this.seeMore ? 'increase' : 'decrease'
  }

  shouldShowItem(index: number) {
    return index < 3 ? 'show' : (this.seeMore ? 'show' : 'hide')
  }
}
