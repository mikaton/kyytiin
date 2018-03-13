import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { RideService } from '../../services/ride.service';
import { ActivatedRoute } from '@angular/router';
import {  MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {
  ride: any;
  dialogRef: any;
  constructor(
    private route: ActivatedRoute,
    private rideService: RideService,
    private location: Location,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getRide();
  }

  getRide(): void {
    const ride_id = this.route.snapshot.paramMap.get('ride_id');
    this.rideService.getRide(ride_id)
      .then(ride => this.ride = ride.data)
      .catch(err => Promise.reject(err));
  }

  goBack(): void {
    this.location.back();
  }

  openAlertDialog(alerDialog) {
    this.dialogRef = this.dialog.open(alerDialog, {
    });

    this.dialogRef.afterClosed().subscribe(result => {
    });
}

  joinRide() {
    this.dialogRef.close();
    const ride = {
      ride_id: this.route.snapshot.paramMap.get('ride_id'),
      customer_id: localStorage.getItem('_id')
    }
    this.rideService.joinRide(ride);
    const data = { 
      ride_id: this.route.snapshot.paramMap.get('ride_id'),
      free_seats: this.ride.free_seats - 1
    }
    this.rideService.patchRide(data)
  }
}
