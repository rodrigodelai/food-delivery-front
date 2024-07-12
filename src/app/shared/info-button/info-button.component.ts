import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './info-button.component.html',
  styleUrl: './info-button.component.css'
})
export class InfoButtonComponent {

  constructor(private snackbar: MatSnackBar) { }

  onInfo() {
    this.snackbar.open('Recurso indisponível.', '✖', { duration: 3000 });
  }

}
