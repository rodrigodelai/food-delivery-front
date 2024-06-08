import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CrudService<Category> {

  constructor(http: HttpClient) {
    super(http, 'category');
  }

}
