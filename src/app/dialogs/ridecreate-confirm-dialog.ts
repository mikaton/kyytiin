import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
@Component({
  template: `
      <h1 mat-dialog-title>Tarkista tiedot</h1>
      <mat-dialog-content>
      <mat-card style="width: 500px">
      <div fxLayout="column">
      <mat-card-title>
      Lähtöpaikka: {{ride.startingplace}}
    </mat-card-title>
    <mat-card-title> 
      Määränpää: {{ride.destination}}
    </mat-card-title>
  </div>
  <mat-card-content>
    Lähtöpäivä: {{ride.time_of_departure | date:'mediumDate'}} aika: {{ride.time_of_departure | date:'shortTime'}}
  </mat-card-content>
  <mat-card-content>
    Saapumispäivä: {{ride.time_of_arrival | date:'mediumDate'}} aika: {{ride.time_of_arrival | date:'shortTime'}}
  </mat-card-content>
  <mat-card-content>
    Vapaita paikkoja: {{ride.free_seats}}
  </mat-card-content>
  <mat-card-content>
    Tupakointi?: {{ride.smoking ? 'Kyllä' : 'Ei'}}
  </mat-card-content>
  <mat-card-content>
    Lemmikkejä?: {{ride.pets ? 'Kyllä' : 'Ei'}}
  </mat-card-content>
    </mat-card> 
      </mat-dialog-content>
      <mat-dialog-actions> 
        <button mat-button (click)="confirm()">Lisää kyyti!</button>
        <button mat-button type="button" (click)="dialogRef.close()">Peruuta</button>
      </mat-dialog-actions>
  `
})
export class RideCreateConfirmDialog {

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RideCreateConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public ride
  ) { }

  confirm() {
    this.dialogRef.close({confirmed: 'totta'});
  }
}