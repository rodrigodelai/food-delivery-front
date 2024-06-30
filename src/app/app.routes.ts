import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { BagComponent } from './bag/bag.component';
import { AccountComponent } from './account/account.component';
import { ProductComponent } from './product/product.component';
import { productResolver } from './guards/product.resolver';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'bag', component: BagComponent },
    { path: 'account', component: AccountComponent },
    { path: 'product/:id', component: ProductComponent, resolve: { product: productResolver } },
    { path: '**', redirectTo: '/home' }
];
