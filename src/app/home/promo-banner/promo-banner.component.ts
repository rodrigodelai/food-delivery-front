import { Component } from '@angular/core';
import { Banner } from '../../model/banner';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [],
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.css'
})
export class PromoBannerComponent {

  banners: Banner[];

  constructor() {
    this.banners = [ 
      { title: "Promo 2", src: "../../assets/img/banner-2.webp", productId: "2"},
      { title: "Promo 1", src: "../../assets/img/banner-1.jpg", productId: "1"},
      { title: "Promo 3", src: "../../assets/img/banner-3.webp", productId: "3"}
    ];
  }

  log(event: any) {
    console.log(event);
    
  }

}
