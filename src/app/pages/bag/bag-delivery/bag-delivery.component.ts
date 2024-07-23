import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AddressComponent } from '../../../shared/address/address.component';
import { SnackbarService } from '../../../services/snackbar.service';
import { SNACKBAR_DATA } from '../../../model/snackbar-data';

@Component({
  selector: 'app-bag-delivery',
  standalone: true,
  imports: [NgClass, MatIconModule, AddressComponent],
  templateUrl: './bag-delivery.component.html',
  styleUrl: './bag-delivery.component.css'
})
export class BagDeliveryComponent {

  pickup: boolean;
  storeAddress: string;
  clientAddress: string;

  constructor(private snackbar: SnackbarService) {
    this.pickup = true;
    this.storeAddress = 'Av. das Nações Unidas, 1000';
    this.clientAddress = 'Maria de Oliveira Maresguia, 6';
  }

  setPickup(value: boolean) {
    this.pickup = value;
  }

  onAddress(){
    this.unavailable();
  }

  onEdit(){
    this.unavailable();
  }

  private unavailable() {
    this.snackbar.open(SNACKBAR_DATA['UNAVAILABLE']);
  }

}
