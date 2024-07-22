import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OrderItem } from '../../../model/order-item';
import { OrderOptionsList } from '../../../model/order-options-list';
import { environment } from '../../../../environments/environment';
import { toggleAnimation } from '../../../animations/toggle';
import { toggleLineAnimation } from '../../../animations/toggle-line';

@Component({
  selector: 'app-bag-product',
  standalone: true,
  imports: [CurrencyPipe, MatIconModule, NgClass],
  animations: [toggleAnimation, toggleLineAnimation],
  templateUrl: './bag-product.component.html',
  styleUrl: './bag-product.component.css'
})
export class BagProductComponent implements OnChanges {

  IMG_SRC!: string;
  seeMore: boolean;
  @Input() item!: OrderItem;
  @Input() index!: number;
  @Output() add = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  @ViewChild('orderDetails') detailsList!: ElementRef<HTMLUListElement>;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.seeMore = false;
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();

    const children = this.detailsList.nativeElement.children;

    if (children.length == 1)
      children[0].classList.add('two-lines');
    else if (children.length > 2) {
      children[1].classList.add('see-more');
      children[children.length - 1].classList.add('see-less');
    }
  }

  ngOnChanges() {
    if (this.item) {
      this.IMG_SRC = environment.apiUrl + 'image/' + this.item.product.imageName;
    }
  }

  changeSeeMore(event: MouseEvent) {
    event.stopPropagation();
    
    this.seeMore = !this.seeMore;

    const list = this.detailsList.nativeElement;

    if (this.seeMore) {
      list.classList.add('wrap');

      if (list.children.length == 1)
        list.children[0].classList.remove('two-lines');
    }
    else
      setTimeout(() => {
        list.classList.remove('wrap');

        if (list.children.length == 1)
          list.children[0].classList.add('two-lines');
      }, 400);

    if (list.children.length > 2)
        list.children[1].classList.toggle('see-more');
}

  shouldBeVisible(item: any) {
    return this.seeMore || !this.isMoreThanSecond(item);
  }

  private isMoreThanSecond(item: any) {
    if (this.detailsList) {
      const children = this.detailsList.nativeElement.children;
      if (item === children[0] || item === children[1]) return false;
      return true;
    }
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

  onAdd(event: MouseEvent) {
    event.stopPropagation();
    this.add.emit(this.index);
  }

  onRemove(event: MouseEvent) {
    event.stopPropagation();
    this.remove.emit(this.index);
  }

}
