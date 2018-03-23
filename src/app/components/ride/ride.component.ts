import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { RideService } from '../../services/ride.service';
import { ActivatedRoute } from '@angular/router';
import {  MatDialog, MatDialogRef } from '@angular/material';
import { LocalAuthService } from '../../services/auth.service';
import { AuthService } from 'angularx-social-login';

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
  isCreator: boolean;

  constructor(
    private route: ActivatedRoute,
    private rideService: RideService,
    private location: Location,
    private dialog: MatDialog,
    private localAuthService: LocalAuthService
  ) { }

  // Ladataan matkat asynkronisesti
  // Jos useampia metodeja ngOnInitissä, syntaksi seuraava:
  // await Promise.all([funktio1(), funktio2()...])
  async ngOnInit() {
      await Promise.all([this.getRide(), this.isCreator = false])
  }

  getRide(): void {
    const ride_id = this.route.snapshot.paramMap.get('ride_id');
    this.rideService.getRide(ride_id)
    .then(ride => this.ride = ride.data[0])
    .then(ride => {
      if (this.ride.customer_id == this.localAuthService.decodeToken()) {
        this.isCreator = true;
      } else {
        this.isCreator = false;
      }
    })
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

  joinRide(ride_id: string, creator_id: string, joiner_id: string) {
    this.confirmEmailButtonClicked = true;

    ride_id = this.ride.ride_id;
    creator_id = this.ride.customer_id;
    joiner_id = localStorage.getItem('_id');

    this.rideService.sendJoinRequest(ride_id, creator_id, joiner_id)
    .then((res) => this.confirmEmailSent = true)
    .catch((err) => console.log('joinRide() failed: ' + err.message));
    
  }
}
