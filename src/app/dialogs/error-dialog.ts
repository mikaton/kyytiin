import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  template: `
<p>asdasdasasdasdasdasdasdasdasdasdasdasdasd</p>
`
})
export class ErrorDialog {

  constructor(

	public dialogRef: MatDialogRef<ErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

}