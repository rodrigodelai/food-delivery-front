import { Component } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  log(msg: string) {
    console.log(msg);
  }

}
