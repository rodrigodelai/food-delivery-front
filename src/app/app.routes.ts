import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { BagComponent } from './pages/bag/bag.component';
import { AccountComponent } from './pages/account/account.component';
import { ProductComponent } from './pages/product/product.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { productResolver } from './guards/product.resolver';

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
