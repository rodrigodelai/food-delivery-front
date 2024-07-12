import { Component } from '@angular/core';
import { InfoButtonComponent } from '../../../shared/info-button/info-button.component';
import { AddressComponent } from '../../../shared/address/address.component';

@Component({
  selector: 'app-address-header',
  standalone: true,
  imports: [AddressComponent, InfoButtonComponent],
  templateUrl: './address-header.component.html',
  styleUrl: './address-header.component.css'
})
export class AddressHeaderComponent {

}
