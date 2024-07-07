import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Option } from '../../../model/option';
import { OptionsList } from '../../../model/options-list';
import { Operation } from '../../../model/operation';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product-options',
  standalone: true,
  imports: [MatExpansionModule, MatListModule, CurrencyPipe, NgClass, MatIconModule],
  templateUrl: './product-options.component.html',
  styleUrl: './product-options.component.css'
})
export class ProductOptionsComponent {
  @Input() optionsList!: OptionsList;
  @Output() selected: EventEmitter<{ option: Option, operation: Operation } >

  readonly API_URL = environment.apiUrl + 'image/'

  constructor() {
    this.selected = new EventEmitter();
  }

  onAdd(selected: Option, event?: MouseEvent) {
    if (selected.quantity)
      selected.quantity++;
    else
      selected.quantity = 1;

    selected = { ...selected, optionsListName: this.optionsList.name };
    
    this.selected.emit({ option: selected, operation: Operation.ADD });

    event?.stopPropagation();
  }

  onRemove(selected: Option, event?: MouseEvent) {
    if (selected.quantity && selected.quantity > 0) {
      selected.quantity--;
  
      selected = { ...selected, optionsListName: this.optionsList.name };
    
      this.selected.emit({ option: selected, operation: Operation.REMOVE });
    }
    
    event?.stopPropagation();
  }

}
