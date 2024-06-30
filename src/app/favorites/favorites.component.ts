import { Component } from '@angular/core';
import { MenuBarComponent } from '../shared/menu-bar/menu-bar.component';
import { FavoritesSectionComponent } from './favorites-section/favorites-section.component';
import { Router } from '@angular/router';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';
import { FavoritesService } from '../services/favorites.service';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MenuBarComponent, FavoritesSectionComponent, PageHeaderComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  categories!: Category[];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private favoritesService: FavoritesService
  ) {
    this.categoryService.list().subscribe((categories) => {
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

    categories.forEach((category) => {
      category.products = category.products.filter((product) =>
        favoritesIds.includes(product.id ?? 0)
      );
    });

    return categories.filter((category) => category.products.length);
  }
}
