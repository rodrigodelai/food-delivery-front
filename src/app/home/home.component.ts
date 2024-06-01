import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { MenuBarComponent } from '../shared/menu-bar/menu-bar.component';
import { PromoBannerComponent } from './promo-banner/promo-banner.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, AddressComponent, MenuBarComponent, PromoBannerComponent, CategoriesComponent, ProductsComponent, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  selectedCategory: number;

  constructor() {
    this.selectedCategory = 1;
  }

  changeSelectedCategory(id: number) {
    this.selectedCategory = id;
  }
}
