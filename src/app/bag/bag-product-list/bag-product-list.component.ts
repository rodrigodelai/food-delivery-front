import { Component } from '@angular/core';
import { BagProductComponent } from '../bag-product/bag-product.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bag-product-list',
  standalone: true,
  imports: [BagProductComponent, MatIconModule],
  templateUrl: './bag-product-list.component.html',
  styleUrl: './bag-product-list.component.css'
})
export class BagProductListComponent {

}
