import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
@Component({
  templateUrl: './ridecreate-confirm-dialog.html',

})
export class RideCreateConfirmDialog {

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RideCreateConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public ride
  ) { }

  confirm() {
    this.dialogRef.close({ confirmed: 'totta' });
  }
}