import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../services/snackbar.service';
import { SNACKBAR_DATA } from '../../model/snackbar-data';

@Component({
  selector: 'app-info-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './info-button.component.html',
  styleUrl: './info-button.component.css'
})
export class InfoButtonComponent {

  constructor(private snackbar: SnackbarService) { }

  onInfo() {
    this.snackbar.open(SNACKBAR_DATA['UNAVAILABLE']);
  }

}
