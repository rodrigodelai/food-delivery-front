import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { pumpAnimation } from '../../animations/pump';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive, MatBadgeModule],
  animations: [pumpAnimation],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  
  @Input() canHide: boolean;
  @HostBinding('class.hide') hide: boolean;
  private lastTouchY: number;
  private static _badgeCounter: number;
  private static _pump: boolean = false;

  constructor(orderService: OrderService) {
    this.canHide = false;
    this.hide = false;
    this.lastTouchY = 10000;
    MenuBarComponent._badgeCounter = orderService.getOrder().items.length ?? 0;
  }

  static get badgeCounter() {
    return MenuBarComponent._badgeCounter;
  }

  static set badgeCounter(value: number) {  
    MenuBarComponent._badgeCounter = value;
    this.triggerPump();
  }

  static clear() {
    MenuBarComponent._badgeCounter = 0;
  }

  private static triggerPump() {
    this._pump = true;

    setTimeout(() => {
      this._pump = false;
    }, 200);
  }

  badgeCounter() {
    return MenuBarComponent._badgeCounter;
  }

  pump() {
    return MenuBarComponent._pump;
  }

  incrementBadgeCounter(value: number = 1) {
    if (this.hide) {
      this.hide = false;
      
      setTimeout(() => {
        MenuBarComponent.badgeCounter += value;
      }, 450);
    }
    else
      MenuBarComponent.badgeCounter += value;
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
