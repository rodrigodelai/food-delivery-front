import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, shareReplay, take } from 'rxjs';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';
import { inject } from '@angular/core';

export class CrudService<T extends { id?: number }> {
  
  protected readonly API_URL: string;
  private cache: CacheService;
  private http: HttpClient;

  constructor(private endpoint: string) {
    this.API_URL = environment.apiUrl + this.endpoint;
    this.http = inject(HttpClient);
    this.cache = inject(CacheService);
  }

  list(params: { [key: string]: boolean } = {}) {
    if (this.cache.has(this.endpoint)) 
      return this.cache.get(this.endpoint) as Observable<T[]>;

    const observable = this.http
      .get<T[]>(this.API_URL, { params: params })
      .pipe(take(1), shareReplay(1));

    this.cache.set(this.endpoint, observable);

    return observable;
  }

  read(id: any) {
    if (this.cache.has(this.endpoint + '/' + id)) 
      return this.cache.get(this.endpoint + '/' + id) as Observable<T>;

    const observable = this.http.get<T>(this.API_URL + '/' + id).pipe(take(1), shareReplay(1));

    this.cache.set(this.endpoint + '/' + id, observable);

    return observable;
  }

  create(record: T) {
    return this.http.post<T>(this.API_URL, record).pipe(take(1));
  }

  update(record: T) {
    return this.http
      .put<T>(this.API_URL + '/' + record.id, record)
      .pipe(take(1));
  }

  delete(record: T) {
    return this.http.delete<T>(this.API_URL + '/' + record.id).pipe(take(1));
  }
}
