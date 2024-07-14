import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private lastCategoryIndex: number;

  constructor() {
    this.lastCategoryIndex = 0;
  }

  setLastCategoryIndex(index: number) {
    this.lastCategoryIndex = index;
  }

  getLastCategoryIndex() {
    return this.lastCategoryIndex;
  }
  
}
