import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatExpansionModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  @Input() product: Product;

  constructor() { 
    this.product = {
        id: 1,
        title: 'Top Cheddar',
        description: 'Blend suculento com 150 g de carne bovina, acompanhado por duas fatias de queijo cheddar, picles, cebola roxa e nosso maravilhoso molho da casa.',
        price: 24.98,
        promoPrice: 21.49,
        optionsIds: [1, 2]
    }
  }

}
