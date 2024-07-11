import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { CrudService } from './crud.service';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CrudService<Category> {

  constructor() {
    super('category');
  }

  addPromoCategory(categories: Category[]) {
    if (categories[0]?.name !== 'Promoções')
      categories.unshift(this.getPromoCategory(categories));
    
    return categories;
  }

  getPromoCategory(categories: Category[]) {
    const promo = {
      name: 'Promoções',
      products: [] as Product[]
    }

    categories.forEach(category => {
      category.products.forEach(product => {
        if (product.promoPrice)
          promo.products.push(product);
      })
    });

    return promo;
  }

}
