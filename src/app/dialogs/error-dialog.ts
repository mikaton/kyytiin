import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Component({
  template: `
	<mat-card-title> <i class="fas fa-bug"></i>{{data.errorMessage}} <i class="fas fa-bug"></i> </mat-card-title>
  <pre>Palvelin palautti virheen:</pre>
  <pre><strong>{{data.serverError}}</strong></pre>
  <mat-dialog-actions> 
  <button mat-button type="button" (click)="dialogRef.close()">Ok</button>
  </mat-dialog-actions>
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