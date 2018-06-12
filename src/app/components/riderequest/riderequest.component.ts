import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { RideService } from '../../services/ride.service';
import { RideRequestService } from '../../services/riderequest.service';
import { ActivatedRoute } from '@angular/router';
import {  MatDialog, MatDialogRef } from '@angular/material';
import { LocalAuthService } from '../../services/auth.service';
import { AuthService } from 'angularx-social-login';
import { JoinRequestService } from '../../services/joinrequest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ErrorUiService } from '../../services/error-ui.service';

@Component({
  selector: 'app-riderequest',
  templateUrl: './riderequest.component.html',
  styleUrls: ['./riderequest.component.css']
})
export class RiderequestComponent implements OnInit {
  request: any;
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
  latStart: number;
  latEnd: number;
  lngStart: number;
  lngEnd: number;
  mapInitialized: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private rideService: RideService,
    private rideRequestService: RideRequestService,
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
  // await Promise.all([funktio1(), funktio2()...])   q
  async ngOnInit() {
      await Promise.all([this.getRequest(), this.isCreator = false])
  }
  getRequest(): void {
    const request_id = this.route.snapshot.paramMap.get('request_id');
    console.log(request_id)
    this.rideRequestService.getRequest(request_id)
    .then(request => this.request = request.data[0])
    .then(request => {
      // Haetaan kartalle ohjeet
      this.rideService.getDirections(this.request.startingplace, this.request.destination)
      .then((res) => {
        console.log(res);
        this.latStart = res.data.routes[0].legs[0].start_location.lat;
        this.latEnd = res.data.routes[0].legs[0].end_location.lat;
        this.lngStart = res.data.routes[0].legs[0].start_location.lng;
        this.lngEnd = res.data.routes[0].legs[0].end_location.lng;
        this.mapInitialized = true;
      })
      .catch((err) => console.error('getDirections epäonnistui: ' + err.message));
      if (this.request.customer_id == this.localAuthService.decodeToken()) {
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
  
  goBack(): void {
    this.location.back();
  }

  openAlertDialog(alerDialog) {
    this.dialogRef = this.dialog.open(alerDialog, {
    });
    this.dialogRef.afterClosed().subscribe(result => {

    });
  }
  acceptRideRequest() {
    this.confirmButtonClicked = true;
    const data = {
      accepter_id: this.localAuthService.decodeToken(),
      request_id: this.request.request_id
    };
    // Lähetetään palvelimelle
    this.rideRequestService.takeRequest(data)
    .then((res) => {
      this.promiseResolved = true;
    })
    .catch((err) => {
      this.errorUiService.popErrorDialog(err);
      this.promiseRejected = true;
      this.dialogRef.close();
      console.error('createRequest epäonnistui: ' + err.message)
    });
  }
}

