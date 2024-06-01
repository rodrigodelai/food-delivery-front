import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShortCategory } from '../model/short-category';
import { take } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Category[]>('/api/categories').pipe(take(1));
  }

}
