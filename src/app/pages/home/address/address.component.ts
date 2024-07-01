import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  address: string;

  constructor(private snackbar: MatSnackBar) {
    this.address = 'Maria de Oliveira Maresguia, 6'
  }

  onAddress(){
    this.unavailable();
  }

  onNotification(){
    this.unavailable();
  }

  private unavailable() {
    this.snackbar.open('Recurso ainda indisponível', '✖', { duration: 7000 });
  }

}
