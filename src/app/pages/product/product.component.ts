import { Component, ViewChild } from '@angular/core';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { ProductHeaderComponent } from './product-header/product-header.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductOptionsComponent } from './product-options/product-options.component';
import { CurrencyPipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductNotesComponent } from './product-notes/product-notes.component';
import { Product } from '../../model/product';
import { Option } from '../../model/option';
import { OrderService } from '../../services/order.service';
import { Operation } from '../../model/operation';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductHeaderComponent, ProductDetailsComponent, ProductOptionsComponent, ProductNotesComponent, MenuBarComponent, CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  product!: Product;
  finalPrice!: number;
  @ViewChild(ProductNotesComponent) notes!: ProductNotesComponent;

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private location: Location,
              private orderService: OrderService,
              public favoritesService: FavoritesService) {
    this.route.data.subscribe(data => {
      this.product = data['product'];
      this.finalPrice = this.product.promoPrice ? this.product.promoPrice : this.product.price;
    })
  }

  handleSelection(selection: { option: Option, operation: Operation }) {
    this.orderService.createItemIfDoesntExist(this.product);
    this.orderService.addOrderOptionToOrderItem(selection.option);
    this.updateBag(selection.operation * selection.option.price);
  }

  private updateBag(price: number) {
    this.finalPrice += price;
  }

  onArrow() {
    this.location.back();
  }

  onHeart(likes: boolean) {
    if (likes)
      this.favoritesService.addFavorite(this.product.id ?? 0);
    else 
      this.favoritesService.removeFavorite(this.product.id ?? 0);
  }

  onSubmit() {
    MenuBarComponent.badgeCounter += 1;
    this.orderService.createOrderIfDoesntExist();
    this.orderService.createItemIfDoesntExist(this.product);
    this.orderService.addNotesToItem(this.notes.text);
    this.orderService.addItemToOrder();
    this.router.navigate(['bag']);
  }
  
}
