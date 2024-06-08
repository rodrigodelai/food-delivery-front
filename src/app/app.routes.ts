import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { BagComponent } from './bag/bag.component';
import { AccountComponent } from './account/account.component';
import { ProductComponent } from './product/product.component';
import { productResolver } from './guards/product.resolver';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/product/1' },
    { path: 'home', component: HomeComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'bag', component: BagComponent },
    { path: 'account', component: AccountComponent },
    { path: 'product/:id', component: ProductComponent, resolve: { product: productResolver } }
];
