import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RideService } from '../../services/ride.service';
import { LocalAuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ridejoinconfirm',
  templateUrl: './ridejoinconfirm.component.html',
  styleUrls: ['./ridejoinconfirm.component.css']
})
export class RideJoinConfirmComponent implements OnInit {
  dialogRef: any;
  creator: any;
  joiner: any;
  ride: any;
  promiseResolved: boolean = false;
  confirmButtonsPressed: boolean = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private rideService: RideService,
    private authService: LocalAuthService,
    private userService: UserService
  ) {
    
  }

  async ngOnInit() {
    await this.getData();
  }

  async getData() {
    await Promise.all([
      this.userService.getUser(this.route.snapshot.params.owner_id)
      .then((data) => this.creator = data),
      this.userService.getUser(this.route.snapshot.params.joiner_id)
      .then((data) => this.joiner = data),
      this.rideService.getRide(this.route.snapshot.params.ride_id)
      .then((ride) => this.ride = ride.data[0])
    ]);
  }


  openDenyDialog(denyDialogTemplate) {
    this.dialogRef = this.dialog.open(denyDialogTemplate, {

    });

    this.dialogRef.afterClosed().subscribe(result => {

    });
  }
  openConfirmDialog(confirmDialogTemplate) {
    this.dialogRef = this.dialog.open(confirmDialogTemplate, {

    });
    this.dialogRef.afterClosed().subscribe(result => {

    });
  }


  denyJoin() {
    this.confirmButtonsPressed = true;
    const ridedenyshit = { 
        customer_id: this.joiner.user.customer_id,
        creator_id: this.creator.user.customer_id,
        ride_id: this.ride.ride_id,
        paska: 'ripulipaska',
      }
    this.rideService.denyJoinRide(ridedenyshit)
    .then((data) => this.promiseResolved = true)
    .catch((err) => console.log('denyJoin() failed: ' + err.message));
  }
  confirmJoin() {
    this.confirmButtonsPressed = true;
    this.rideService.confirmJoinRide(this.ride.ride_id, this.joiner.user.customer_id)
    .then((data) => this.promiseResolved = true)
    .catch((err) => console.log('confirmJoin() failed: ' + err.message));
  }
}
