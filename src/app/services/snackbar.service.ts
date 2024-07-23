import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarData } from '../model/snackbar-data';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) {}

  open(data: SnackbarData) {
    this.snackbar.open(data.message, data.action, data.config);
  }
  
}
