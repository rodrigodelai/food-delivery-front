import { Component } from '@angular/core';
import { MenuBarComponent } from '../shared/menu-bar/menu-bar.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MenuBarComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {

}
