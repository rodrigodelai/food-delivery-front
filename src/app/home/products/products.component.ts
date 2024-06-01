import { Component, Input, OnChanges } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import { Product } from '../../model/product';
import { CategoryService } from '../../services/category.service';
import { ShortCategory } from '../../model/short-category';
import { Category } from '../../model/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnChanges {

  @Input() selectedCategory: number; 
  products!: Product[];

  constructor(private service: CategoryService, private router: Router) {
    this.selectedCategory = 1;
    this.products = [];
  }

  ngOnChanges() {
    this.service.list().subscribe((v: Category[]) => {
      this.products = new Array<Product>();
      v[this.selectedCategory - 1].products.forEach(product => this.products.push(product));
    });
  }

  onCardItem(id: number) {
    this.router.navigate(['/product', id]);
  }

  log(msg: any) {
    console.log(msg);
  }

}
