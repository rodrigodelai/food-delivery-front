import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Address } from '../../model/address';
import { SnackbarService } from '../../services/snackbar.service';
import { SNACKBAR_DATA } from '../../model/snackbar-data';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  address: Address;
  @Input() showButton: boolean; 
  @Input() pickup: boolean;

  constructor(private snackbar: SnackbarService) {
    this.address = {
      street: 'Av. das Nações Unidas',
      number: 1000,
      complement: 'Casa',
      district: 'Jardim Santa Paula', 
      city: 'São Carlos',
      state: 'SP',
      zipCode: '13564030'
    }
    this.showButton = false;
    this.pickup = false;
  }
  
  onEdit() {
    this.snackbar.open(SNACKBAR_DATA['UNAVAILABLE']);
  }

  showLocation() {
    this.snackbar.open(SNACKBAR_DATA['UNAVAILABLE']);
  }

  onMap() {
    this.snackbar.open(SNACKBAR_DATA['UNAVAILABLE']);
  }

}
