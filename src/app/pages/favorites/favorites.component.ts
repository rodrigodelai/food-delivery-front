import { Component } from '@angular/core';
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
          this.dialogService.openSimpleDialog('200ms', '100ms', {
            message:
              'Houve um problema na comunicação com o servidor. Tente novamente mais tarde. Se o problema persistir, contate o suporte.',
            confirmMsg: 'Ok',
          });
          return of([] as Category[]);
        })
      )
      .subscribe((categories) => {
        categoryService.addPromoCategory(categories);
        this.categories = this.filterCategories(categories);
      });
  }

  onCardItem(id: number) {
    this.router.navigate(['/product', id]);
  }

  onHeart() {
    this.categories = this.filterCategories(this.categories);
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
