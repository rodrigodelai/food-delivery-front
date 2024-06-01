import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common'
import { MatExpansionModule } from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Option } from '../../model/option';
import { OptionsList } from '../../model/options-list';

@Component({
  selector: 'app-product-options',
  standalone: true,
  imports: [MatExpansionModule, MatListModule, CurrencyPipe, NgClass, MatIconModule],
  templateUrl: './product-options.component.html',
  styleUrl: './product-options.component.css'
})
export class ProductOptionsComponent {
  @Input() optionsList: OptionsList;
  @Output() bagChange: EventEmitter<number>;

  constructor() {
    this.optionsList = {
        title: 'Adicionais',
        options: [{ name: 'Cebola', price: 1234 }, { name: 'Alface', price: 1.5 }, { name: 'Bacon', price: 2.98 }, { name: 'Queijo', price: 1.99 }]
    }
    this.bagChange = new EventEmitter();
  }

  onAdd(selected: Option, event?: MouseEvent) {
    if (selected.quantity)
      selected.quantity++;
    else
      selected.quantity = 1;

    this.bagChange.emit(selected.price);
    event?.stopPropagation();
  }

  onRemove(selected: Option, event?: MouseEvent) {
    if (selected.quantity && selected.quantity > 0) {
      selected.quantity--;
      this.bagChange.emit(-selected.price);
    }
    
    event?.stopPropagation();
  }

}
