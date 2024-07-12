import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AddressHeaderComponent } from './address-header/address-header.component';
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
import { catchError, of } from 'rxjs';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    AddressHeaderComponent,
    MenuBarComponent,
    PromoBannerComponent,
    CategoriesComponent,
    ProductsComponent,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  banners!: Banner[];
  categories!: Category[];
  products!: Product[];

  @ViewChild(MenuBarComponent) menuBar!: MenuBarComponent;

  constructor(
    private bannerService: BannerService,
    private categoryService: CategoryService,
    private router: Router,
    private dialogService: ConfirmationDialogService
  ) {
    this.bannerService
      .list()
      .pipe(
        catchError(() => {
          this.dialogService.openSimpleDialog('200ms', '100ms', {
            message:
              'Houve um problema na comunicação com o servidor. Tente novamente mais tarde. Se o problema persistir, contate o suporte.',
            confirmMsg: 'Ok',
          });
          return of([] as Banner[]);
        })
      )
      .subscribe((banners) => {
        this.banners = banners;
      });

    this.categoryService
      .list()
      .pipe(catchError(() => of([] as Category[])))
      .subscribe((categories) => {
        categoryService.addPromoCategory(categories);
        this.categories = categories;
        this.products = categories[0].products;
      });
  }

  showInfo() {
  }

  editAddress() {
  }

  changeSelectedCategory(index: number) {
    this.products = this.categories[index].products;
  }

  toProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  incrementBadgeCounter() {
    this.menuBar.incrementBadgeCounter();
  }

}
