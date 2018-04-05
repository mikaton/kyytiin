import { Component, OnInit } from '@angular/core';
import { JoinRequestService } from '../../services/joinrequest.service';
import { ActivatedRoute } from '@angular/router';
import { RideService } from '../../services/ride.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-join-request',
  templateUrl: './join-request.component.html',
  styleUrls: ['./join-request.component.css']
})
export class JoinRequestComponent implements OnInit {
  request: any;
  dialogRef: any;
  promiseResolved: boolean = false;
  confirmButtonsPressed: boolean = false;

  constructor(
    private requestService: JoinRequestService,
    private rideService: RideService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.getRequest();
  }

  getRequest(): void {
    const request_id = this.route.snapshot.paramMap.get('id');
    this.requestService.getRequestById(request_id)
    .then((request) => {
      this.request = request.data;
    })
    .catch((err) => console.error('getRequest epäonnistui: ' + err.message));
  }

  openConfirmDialog(confirmDialogTemplate) {
    this.dialogRef = this.dialog.open(confirmDialogTemplate, {});
  }

  openDenyDialog(denyDialogTemplate) {
    this.dialogRef = this.dialog.open(denyDialogTemplate, {});
  }

  joinRide() {
    this.confirmButtonsPressed = true;
    console.log(this.request);
    const joiner_id = this.request.joiner_id;
    const ride_id = this.request.ride_id;

    this.rideService.joinRide(ride_id, joiner_id)
    .then((res) => {
      this.promiseResolved = true;
      console.log('onnistui');
    })
    .catch((err) => console.error('joinRide epäonnistui: ' + err.message));
  }
}
