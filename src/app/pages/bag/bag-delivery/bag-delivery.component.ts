import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bag-delivery',
  standalone: true,
  imports: [NgClass, MatIconModule],
  templateUrl: './bag-delivery.component.html',
  styleUrl: './bag-delivery.component.css'
})
export class BagDeliveryComponent {

  pickup: boolean;
  storeAddress: string;
  clientAddress: string;

  constructor(private snackbar: MatSnackBar) {
    this.pickup = true;
    this.storeAddress = 'Av. das Nações Unidas, 1000';
    this.clientAddress = 'Maria de Oliveira Maresguia, 6';
  }

  changePickup() {
    this.pickup = !this.pickup;
  }

  onAddress(){
    this.unavailable();
  }

  onEdit(){
    this.unavailable();
  }

  private unavailable() {
    this.snackbar.open('Recurso ainda indisponível', '✖', { duration: 7000 });
  }

}
