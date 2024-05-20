import { Component } from '@angular/core';
import { MenuBarComponent } from '../shared/menu-bar/menu-bar.component';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [MenuBarComponent],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css'
})
export class BagComponent {

}
