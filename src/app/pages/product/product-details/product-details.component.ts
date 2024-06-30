import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatExpansionModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  @Input() product!: Product;

  constructor() { }

}
