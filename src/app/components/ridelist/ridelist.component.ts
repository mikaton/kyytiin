import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RideService } from '../../services/ride.service';
import { ErrorUiService } from '../../services/error-ui.service';

@Component({
  selector: 'app-ridelist',
  templateUrl: './ridelist.component.html',
  styleUrls: ['./ridelist.component.css']
})
export class RidelistComponent implements OnInit {
  constructor(
    private rideService: RideService,
    private errorUiService: ErrorUiService
  ) { }
  rides = [];
  noRides: boolean;
  startingplace: string;
  destination: string;

  async ngOnInit() {
    await this.getRides();
  }

  getRides() {
    this.rideService.getRides()
      .then((rides => {
        this.rides = rides;
        if (rides.length === 0) {
          this.noRides = true;
        } else {
          this.noRides = false;
        }
      }))
      .catch((err) => {
        this.errorUiService.popErrorDialog(err);
        console.error('getRides epäonnistui: ' + err.message)
      });
  }
}
