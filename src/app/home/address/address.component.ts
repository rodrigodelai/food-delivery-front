import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  address: string;

  constructor() {
    this.address = 'Maria de Oliveira Maresguia, 6'
  }

}
