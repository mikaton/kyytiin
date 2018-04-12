
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { RideService } from '../../services/ride.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LocalAuthService } from '../../services/auth.service';
import { AuthService } from 'angularx-social-login';
import { JoinRequestService } from '../../services/joinrequest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ErrorUiService } from '../../services/error-ui.service';
@Component({
  selector: 'app-user-made-ride',
  templateUrl: './user-made-ride.component.html',
  styleUrls: ['./user-made-ride.component.css']
})
export class UserMadeRideComponent implements OnInit {

  ride: any;
  dialogRef: any;
  errorDialogRef: any;
  messageForm: FormGroup;
  joiner_name: string;
  startingplace: string;
  destination: string;
  requestSent: boolean;
  deviate: boolean;
  joiner: any[];
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
    await this.getRide()
  }
  test() {
    var joiner = ["x", "y", "z", "a"]
    this.userService.getMultipleUsers(...joiner)
  }
  getRide() {
    const ride_id = this.route.snapshot.paramMap.get('ride_id')
    console.log(ride_id)
    console.log(this.localAuthService.decodeToken())
    this.rideService.getUserMadeRide(ride_id, this.localAuthService.decodeToken())
      .then(data => {
        console.log(data);
        this.ride = data.ride
        this.joiner = data.joiner
        this.userService.getMultipleUsers(...this.joiner)

      })
      .catch((err) => {
        this.errorUiService.popErrorDialog(err);
        console.error('getRide epäonnistui: ' + err.message)
      });
  }

  goBack(): void {
    this.location.back();
  }
}
