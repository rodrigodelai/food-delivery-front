import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService<Product> {

  constructor(http: HttpClient) {
    super(http, 'product');
  }
}
