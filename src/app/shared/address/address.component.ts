import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Address } from '../../model/address';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private snackbar: MatSnackBar) {
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
    this.snackbar.open('Recurso indisponível.', '✖', { duration: 3000 });
  }

  showLocation() {
    this.snackbar.open('Recurso indisponível.', '✖', { duration: 3000 });
  }

  onMap() {
    this.snackbar.open('Recurso indisponível.', '✖', { duration: 3000 });
  }

}
