import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  
  @HostBinding('class.hide') hide: boolean;
  @Input() canHide: boolean;

  constructor() {
    this.hide = false;
    this.canHide = false;
  }

  @HostListener("window:wheel", ['$event'])
  onScroll(e: WheelEvent) {
    if (!this.canHide) 
      return;

    const delta = e.deltaY;

    if (delta > 0)
      this.hide = true;
    else if (delta < 0)
      this.hide = false;
  }
}
