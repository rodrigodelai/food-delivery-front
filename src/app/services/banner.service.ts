import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Banner } from '../model/banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Banner[]>('/api/banners').pipe(take(1));
  }

}
