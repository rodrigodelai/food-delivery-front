import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { PromoBannerComponent } from './promo-banner/promo-banner.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { NgClass } from '@angular/common';
import { Category } from '../../model/category';
import { Product } from '../../model/product';
import { Banner } from '../../model/banner';
import { BannerService } from '../../services/banner.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    AddressComponent,
    MenuBarComponent,
    PromoBannerComponent,
    CategoriesComponent,
    ProductsComponent,
    NgClass,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  banners!: Banner[];
  categories!: Category[];
  products!: Product[];

  constructor(
    private bannerService: BannerService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.bannerService.list().subscribe((banners) => {
      this.banners = banners;
    });

    this.categoryService.list().subscribe((categories) => {
      categories.unshift(categoryService.getPromoCategory(categories));
      this.categories = categories;
      this.products = categories[0].products;
    });

  }

  changeSelectedCategory(index: number) {
    this.products = this.categories[index].products;
  }

  toProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

}
