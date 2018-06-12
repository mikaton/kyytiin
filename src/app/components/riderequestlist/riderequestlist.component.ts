import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RideRequestService } from '../../services/riderequest.service';
import { ErrorUiService } from '../../services/error-ui.service';

@Component({
  selector: 'app-riderequestlist',
  templateUrl: './riderequestlist.component.html',
  styleUrls: ['./riderequestlist.component.css']
})
export class RiderequestlistComponent implements OnInit {
  constructor(
    private rideRequestService: RideRequestService,
    private errorUiService: ErrorUiService
  ) { }
  requests = [];
  noRequests: boolean;
  startingplace: string;
  destination: string;

  async ngOnInit() {
    await this.getRequests();
  }

  getRequests() {
    this.rideRequestService.getRequests()
      .then((requests => {
        this.requests = requests;
        console.log(this.requests);
        if (requests.length === 0) {
          this.noRequests = true;
        } else {
          this.noRequests = false;
        }
      }))
      .catch((err) => {
        this.errorUiService.popErrorDialog(err);
        console.error('getRides epäonnistui: ' + err.message)
      });
  }
}
