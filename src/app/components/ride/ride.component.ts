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
  confirmEmailSent: boolean = false;
  confirmEmailButtonClicked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private rideService: RideService,
    private location: Location,
    private dialog: MatDialog
  ) { }

  // Ladataan matkat asynkronisesti
  // Jos useampia metodeja ngOnInitissä, syntaksi seuraava:
  // await Promise.all([funktio1(), funktio2()...])
  async ngOnInit() {
    await this.getRide();
  }

  getRide(): void {
    const ride_id = this.route.snapshot.paramMap.get('ride_id');
    this.rideService.getRide(ride_id)
    .then(ride => this.ride = ride.data)
    .catch(err => console.error('getRide() failed: ' + err.message));
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
    this.confirmEmailButtonClicked = true;
    
  }
}
