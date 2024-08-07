import { Component, ViewChild } from '@angular/core';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { FavoritesSectionComponent } from './favorites-section/favorites-section.component';
import { Router } from '@angular/router';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { FavoritesService } from '../../services/favorites.service';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, of } from 'rxjs';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { DIALOG_DATA } from '../../model/dialog-data';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    MenuBarComponent,
    FavoritesSectionComponent,
    PageHeaderComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {

  categories!: Category[];

  @ViewChild(MenuBarComponent) menuBar!: MenuBarComponent;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private favoritesService: FavoritesService,
    private dialogService: ConfirmationDialogService
  ) {
    this.categoryService
      .list()
      .pipe(
        catchError(() => {
          this.dialogService.open(DIALOG_DATA['UNAVAILABLE']);
          return of([] as Category[]);
        })
      )
      .subscribe((categories) => {
        categoryService.addPromoCategory(categories);
        this.categories = this.filterCategories(categories);
      });
  }

  toProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  refreshFavorites() {
    this.categories = this.filterCategories(this.categories);
  }

  incrementBadgeCounter() {
    this.menuBar.incrementBadgeCounter();
  }

  private filterCategories(categories: Category[]) {
    const favoritesIds = this.favoritesService.getFavoritesIds();

    const favorites = categories.map((category) => ({
      ...category,
      products: [...category.products],
    }));

    favorites.forEach((category) => {
      category.products = category.products.filter((product) =>
        favoritesIds.includes(product.id ?? 0)
      );
    });

    return favorites.filter((category) => category.products.length);
  }
}
