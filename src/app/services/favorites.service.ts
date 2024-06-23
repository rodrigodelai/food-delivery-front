import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritesIds: number[];

  constructor() {
    this.favoritesIds = this.createIfNotExists();
  }

  private createIfNotExists(): number[] {
    if (!localStorage.getItem('favorites'))
      localStorage.setItem('favorites', JSON.stringify([]));

    return JSON.parse(localStorage.getItem('favorites') ?? '[]');
  }

  getFavoritesIds(): number[] {
    return this.favoritesIds;
  }
  isFavorite(id: number): boolean {
    return this.getFavoritesIds().includes(id);
  }

  addFavorite(id: number): void {
    this.getFavoritesIds().push(id);
    localStorage.setItem('favorites', JSON.stringify(this.getFavoritesIds()));
  }

  removeFavorite(id: number): void {
    this.getFavoritesIds().splice(this.getFavoritesIds().indexOf(id), 1);
    localStorage.setItem('favorites', JSON.stringify(this.getFavoritesIds()));
  }

}
