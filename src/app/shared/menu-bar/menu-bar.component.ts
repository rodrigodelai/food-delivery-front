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
  
  @Input() canHide: boolean;
  @HostBinding('class.hide') private hide: boolean;
  private lastTouchY: number;


  constructor() {
    this.hide = false;
    this.canHide = false;
    this.lastTouchY = 10000;
  }

  // Hide menu bar on mouse scroll
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

  // Hide menu bar on touch scroll
  @HostListener("window:touchmove", ['$event'])
  onTouchScroll(e: TouchEvent) {
    if (!this.canHide) 
      return;

    const touch = e.touches[0];
    const delta = touch.clientY - (this.lastTouchY ?? touch.clientY);

    if (delta > 0)
      this.hide = false;
    else if (delta < 0)
      this.hide = true;

    this.lastTouchY = touch.clientY;
  }

}
