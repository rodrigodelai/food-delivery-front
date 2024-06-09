import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { CrudService } from './crud.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from '../model/dialog-data';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(public dialog: MatDialog) { }

  private notFoundMsg(functionName: string): string {
    return `Function name "${functionName}" was not present in the function map you passed.`
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: DialogData, map: Map<string, Function>, parameters?: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: 'min(425px, 100vw)',
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    });
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        (map.get(data.confirmFunctionName) ?? (() => console.log(this.notFoundMsg(data.confirmFunctionName))))(parameters);
      else 
        (map.get(data.cancelFunctionName) ?? (() => console.log(this.notFoundMsg(data.cancelFunctionName))))(parameters);
    });

    return dialogRef;
  }

  

}
