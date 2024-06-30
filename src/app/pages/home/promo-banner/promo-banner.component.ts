import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Banner } from '../../../model/banner';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [],
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.css'
})
export class PromoBannerComponent {

  @Input() banners!: Banner[];
  @Output() banner: EventEmitter<number>;

  constructor() {
    this.banner = new EventEmitter<number>();
  }

  onBanner(id: number) {
    this.banner.emit(id);
  }

}
