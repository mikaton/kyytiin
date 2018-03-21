import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Component({
  template: `
  <mat-card>
  <mat-card-title>{{data.errorMessage}}</mat-card-title>
  <mat-card-content>Palvelin palautti virheen:</mat-card-content>
  <pre>{{data.serverError}}</pre>
  <mat-dialog-actions> 
  <button mat-button type="button" (click)="dialogRef.close()">Ok</button>
  </mat-dialog-actions>
  </mat-card>
  `
})
export class ErrorDialog {

  constructor(
	public dialogRef: MatDialogRef<ErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  confirm() {
    this.dialogRef.close({ confirmed: 'totta' });
  }
}