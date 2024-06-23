import { CurrencyPipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [MatIconModule, NgClass, CurrencyPipe, NgClass],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {

  fontIcon: string;
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() price: number;
  @Input() promoPrice?: number;
  @Output() heart: EventEmitter<void>;

  @ViewChild('title') title: ElementRef | undefined;

  constructor(private favoritesService: FavoritesService, private changeDetector: ChangeDetectorRef) {
    this.fontIcon = "favorite_outline";
    this.id = 0;
    this.name = "Name";
    this.description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.";
    this.price = 0;
    this.heart = new EventEmitter();
  }

  ngOnInit() {
    this.fontIcon = this.favoritesService.isFavorite(this.id) ? "favorite" : "favorite_outline";
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges(); // Forces the change detection after the view is initialized; needed to avoid error at ngClass directive because it depends of the element height
  }

  onHeart(event: Event) {
    event.stopPropagation();
    
    if (this.fontIcon === "favorite_outline") {
      this.fontIcon = "favorite";
      this.favoritesService.addFavorite(this.id);
    } 
    else {
      this.fontIcon = "favorite_outline";
      this.favoritesService.removeFavorite(this.id);
    }

    this.heart.emit();
  }

  titleHasMultipleLines() {
    const element = this.title?.nativeElement as HTMLElement;

    if (!element)
      return false;

    const lineHeight = parseFloat(window.getComputedStyle(element).fontSize) * 1.2; // 1.2 is the standard line height
    const elementHeight = element.offsetHeight;

    return elementHeight > lineHeight;
  }
}
