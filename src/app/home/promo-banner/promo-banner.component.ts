import { Component } from '@angular/core';
import { Banner } from '../../model/banner';
import { BannerService } from '../../services/banner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [],
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.css'
})
export class PromoBannerComponent {

  banners!: Banner[];

  constructor(private service: BannerService, private router: Router) {
    this.service.list().subscribe(v => this.banners = v);
  }

  onBanner(id: number) {
    this.router.navigate(['/product', id]);
  }

}
