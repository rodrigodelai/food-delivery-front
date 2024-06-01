import { Component } from '@angular/core';
import { MenuBarComponent } from '../shared/menu-bar/menu-bar.component';
import { ProductHeaderComponent } from './product-header/product-header.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductOptionsComponent } from './product-options/product-options.component';
import { CurrencyPipe } from '@angular/common';
import { Option } from '../model/option';
import { Router } from '@angular/router';
import { ProductNotesComponent } from './product-notes/product-notes.component';
import { Product } from '../model/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductHeaderComponent, ProductDetailsComponent, ProductOptionsComponent, ProductNotesComponent, MenuBarComponent, CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  product: Product;
  finalPrice: number;

  constructor(private router: Router) {
    this.product = {
        id: 1,
        title: 'Top Cheddar',
        description: 'Blend suculento com 150 g de carne bovina, acompanhado por duas fatias de queijo cheddar, picles, cebola roxa e nosso maravilhoso molho da casa.',
        price: 24.98,
        promoPrice: 21.49,
        optionsIds: [1, 2]
    }
    this.finalPrice = this.product.promoPrice ? this.product.promoPrice : this.product.price;
  }

  updateBag(price: number) {
    this.finalPrice += price;
  }

  onSubmit() {
    //TO-DO: Save order at Local Storage;
    this.router.navigate(['bag']);
  }
  
}
