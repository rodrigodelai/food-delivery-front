import { Injectable } from '@angular/core';
import { CacheData } from '../model/cache-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: Map<string, CacheData>;
  private readonly expiration: number;

  constructor() { 
    this.cache = new Map<string, CacheData>();
    this.expiration = 300000; // 5 minutes
  }

  set(key: string, value: Observable<any>) {
    const data = { value: value, expiration: Date.now() + this.expiration };
    this.cache.set(key, data);
  }

  get(key: string) {
    return this.cache.get(key)?.value;
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  has(key: string) {
    const data = this.cache.get(key);

    if (data?.expiration && data.expiration < Date.now()) {
      this.delete(key);
      return false;
    }

    return data?.value !== undefined;
  }

}
