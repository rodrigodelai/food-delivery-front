import { ResolveFn } from '@angular/router';
import { Product } from '../model/product';
import { inject } from '@angular/core';
import { ProductService } from '../services/product.service';

export const productResolver: ResolveFn<Product> = (route, state) => {
  return inject(ProductService).read(route.paramMap.get('id'));
};
