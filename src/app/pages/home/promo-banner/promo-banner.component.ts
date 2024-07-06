import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Banner } from '../../../model/banner';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.css'
})
export class PromoBannerComponent {

  readonly API_URL = environment.apiUrl;
  @Input() banners: Banner[];
  @Output() banner: EventEmitter<number>;
  spinner: boolean;

  constructor() {
    this.banners = [];
    this.banner = new EventEmitter<number>();
    this.spinner = true;
  }

  ngOnChanges() {
    this.spinner = false;
  }

  onBanner(id: number) {
    this.banner.emit(id);
  }

}
