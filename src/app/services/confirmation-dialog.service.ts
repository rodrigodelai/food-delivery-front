import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from '../model/dialog-data';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(public dialog: MatDialog) { }

  open(data: DialogData) {
    return this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: 'min(425px, 100vw)',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '100ms',
      data
    });
  }

}
