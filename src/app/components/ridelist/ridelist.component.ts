import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RideService } from '../../services/ride.service';
import { error } from 'util';

@Component({
  selector: 'app-ridelist',
  templateUrl: './ridelist.component.html',
  styleUrls: ['./ridelist.component.css']
})
export class RidelistComponent implements OnInit {
  constructor(private rideService: RideService) { }
  rides = [];
  startingplace: string;
  destination: string;
  
  ngOnInit() {
    this.getRides();
  }

  getRides() {
    this.rideService.getRides()
    .then((rides => {
      this.rides = rides;
    }))
    .catch((err) => Promise.reject(err));
  }
}
