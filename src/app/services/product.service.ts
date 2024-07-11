import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService<Product> {

  constructor() {
    super('product');
  }
  
}
