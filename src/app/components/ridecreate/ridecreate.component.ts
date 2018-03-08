import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VERSION, MatDialog, MatDialogRef } from '@angular/material';
import { RideService } from '../../../services/ride.service';
import { RideCreateConfirmDialog } from '../../dialogs/ridecreate-confirm-dialog';

@Component({
  selector: 'app-ridecreate',
  templateUrl: './ridecreate.component.html',
  styleUrls: ['./ridecreate.component.css']
})
export class RidecreateComponent implements OnInit {
  rideCreateConfirmDialogRef: MatDialogRef<RideCreateConfirmDialog>

  constructor(private rideService: RideService,
    private dialog: MatDialog,
  ) { };

  time_of_arrival: DateTimeFormat
  time_of_departure: DateTimeFormat
  startingplace: string
  destination: string
  free_seats: number
  smoking: boolean
  pets: boolean
  test_confirmed: boolean
  ngOnInit() {
  }

  openConfirmDialog(ride): Promise<any> {
    this.rideCreateConfirmDialogRef = this.dialog.open(RideCreateConfirmDialog, {
      data: {
        startingplace: ride.startingplace,
        destination: ride.destination,
        time_of_departure: ride.time_of_departure,
        time_of_arrival: ride.time_of_arrival,
        free_seats: ride.free_seats,
        smoking: ride.smoking,
        pets: ride.pets
      }
    })
    return this.rideCreateConfirmDialogRef.afterClosed().toPromise()
      .then(confirmed => {
        if (confirmed != undefined) {
          this.test_confirmed = true; 
        } else {
          this.test_confirmed = false;
        }
      })
      .catch((err) => Promise.reject(err));
  }

  rideCreate(rideForm: NgForm) {
    rideForm.value.customer_id = this.updateId();
    this.openConfirmDialog(rideForm.value).then((confirmed) => {
      if (this.test_confirmed) {
        rideForm.value.hidden = false;
        if (rideForm.value.smoking === undefined) {
          rideForm.value.smoking = false;
        }
        if (rideForm.value.pets === undefined) {
          rideForm.value.pets = false;
        }
        if (rideForm.value.alternate_time_of_departure === undefined) {
          rideForm.value.alternate_time_of_departure = rideForm.value.time_of_departure;
        }
        if (rideForm.value.alternate_time_of_arrival === undefined) {
          rideForm.value.alternate_time_of_arrival = rideForm.value.time_of_arrival;
        }
        this.rideService.postRides(rideForm.value);
      }
    })
      .catch((err) => Promise.reject(err));
  }
  updateId() {
    return localStorage.getItem('_id')
  }
}