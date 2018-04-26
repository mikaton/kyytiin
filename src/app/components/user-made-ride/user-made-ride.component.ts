
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { RideService } from '../../services/ride.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LocalAuthService } from '../../services/auth.service';
import { AuthService } from 'angularx-social-login';
import { JoinRequestService } from '../../services/joinrequest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ErrorUiService } from '../../services/error-ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-made-ride',
  templateUrl: './user-made-ride.component.html',
  styleUrls: ['./user-made-ride.component.css']
})
export class UserMadeRideComponent implements OnInit {

  ride: any;
  joiner_name: string;
  startingplace: string;
  destination: string;
  requestSent: boolean;
  deviate: boolean;
  promiseResolved: boolean;
  joiners: any[];
  dialogRef: any;
  confirmButtonsPressed: boolean;
  constructor(
    private route: ActivatedRoute,
    private rideService: RideService,
    private fb: FormBuilder,
    private location: Location,
    private dialog: MatDialog,
    private localAuthService: LocalAuthService,
    private requestService: JoinRequestService,
    private userService: UserService,
    private errorUiService: ErrorUiService,
    private router: Router
  ) {
  }

  // Ladataan matkat asynkronisesti
  // Jos useampia metodeja ngOnInitissä, syntaksi seuraava:
  // await Promise.all([funktio1(), funktio2()...])
  async ngOnInit() {
    await this.getRide()
  }

  getRide() {
    const ride_id = this.route.snapshot.paramMap.get('ride_id')
    this.rideService.getUserMadeRide(ride_id, this.localAuthService.decodeToken())
      .then(data => {
        this.ride = data.ride
        this.joiners = data.joiners
      })
      .catch((err) => {
        this.errorUiService.popErrorDialog(err);
        console.error('getRide epäonnistui: ' + err.message)
      });
  }
  deleteRide() {
    this.confirmButtonsPressed = true;
    this.rideService.deleteRide(this.route.snapshot.paramMap.get('ride_id'))
    .then((res) => {
      this.promiseResolved = true;
      this.router.navigate(['/user']);
    })
    .catch((err) => {
      this.errorUiService.popErrorDialog(err);
      console.error('denyJoinRide epäonnistui: ' + err.message)
    });
  }

  openDeleteDialog(deleteRideTemplate) {
    this.dialogRef = this.dialog.open(deleteRideTemplate, {});
  }

  goBack(): void {
    this.location.back();
  }
}
