import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './error-dialog.html',
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