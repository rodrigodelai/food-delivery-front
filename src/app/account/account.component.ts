import { Component } from '@angular/core';
import { MenuBarComponent } from '../shared/menu-bar/menu-bar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MenuBarComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
