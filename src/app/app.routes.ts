import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { BagComponent } from './bag/bag.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'bag', component: BagComponent },
    { path: 'account', component: AccountComponent }
];
