import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { MenuBarComponent } from '../shared/menu-bar/menu-bar.component';
import { PromoBannerComponent } from './promo-banner/promo-banner.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, AddressComponent, MenuBarComponent, PromoBannerComponent, CategoriesComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
