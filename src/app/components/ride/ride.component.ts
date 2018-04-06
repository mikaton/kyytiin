import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { RideService } from '../../services/ride.service';
import { ActivatedRoute } from '@angular/router';
import {  MatDialog, MatDialogRef } from '@angular/material';
import { LocalAuthService } from '../../services/auth.service';
import { AuthService } from 'angularx-social-login';
import { JoinRequestService } from '../../services/joinrequest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ErrorUiService } from '../../services/error-ui.service';
@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {
  ride: any;
  dialogRef: any;
  errorDialogRef: any;
  promiseResolved: boolean = false;
  promiseRejected: boolean = false;
  confirmButtonClicked: boolean = false;
  messageForm: FormGroup;
  isCreator: boolean;
  joiner_name: string;
  startingplace: string;
  destination: string;
  requestSent: boolean;
  deviate: boolean;
  constructor(
    private route: ActivatedRoute,
    private rideService: RideService,
    private fb: FormBuilder,
    private location: Location,
    private dialog: MatDialog,
    private localAuthService: LocalAuthService,
    private requestService: JoinRequestService,
    private userService: UserService,
    private errorUiService: ErrorUiService
  ) {
    this.messageForm = this.fb.group({
      message: ['', Validators.maxLength(512)]
    });
  }

  get message() { return this.messageForm.get('message') };
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
    .catch((err) => {
      this.errorUiService.popErrorDialog(err);
      console.error('getRide epäonnistui: ' + err.message)
    });
  }
  
  log() {
    console.log(this.ride);
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

  async createRequest() {
    this.confirmButtonClicked = true;

    // Haetaan käyttäjän ja matkan tiedot
    await Promise.all([
      this.rideService.getRide(this.route.snapshot.paramMap.get('ride_id'))
      .then((ride) => {
        this.startingplace = ride.data[0].startingplace;
        this.destination = ride.data[0].destination;
      }),
      this.userService.getUser(this.localAuthService.decodeToken())
      .then((res) => {
        this.joiner_name = res.user.firstName + " " + res.user.lastName;
      })
    ]);
    // Otetaan data talteen
    const data = {
      ride_id: this.route.snapshot.paramMap.get('ride_id'),
      creator_id: this.ride.customer_id,
      joiner_id: await this.localAuthService.decodeToken(),
      joiner_name: this.joiner_name,
      startingplace: this.startingplace,
      destination: this.destination,
      additional_information: this.message.value,
    };
    // Lähetetään palvelimelle
    this.requestService.createRequest(data)
    .then((res) => {
      this.promiseResolved = true;
    })
    .catch((err) => {
      this.errorUiService.popErrorDialog(err);
      console.error('createRequest epäonnistui: ' + err.message)
    });
  }

}
