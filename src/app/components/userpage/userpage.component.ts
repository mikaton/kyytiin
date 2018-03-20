import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LocalAuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  constructor(private userService: UserService,
    private localAuthService: LocalAuthService,
    private rideService: RideService) { }
  localUser: any;
  rides = [];
  joinedRides = [];

  async ngOnInit() {
    this.defaultUserValues();
    await Promise.all([this.updateUserdata(), this.getRides()]);
  }

  updateUserdata() {
    this.userService.getUser(localStorage.getItem('_id'))
      .then((result) => {
        this.localUser = result;
      })
      .catch(err => console.error('updateUserData() failed: ' + err.message));
  }

  getRides() {
    this.rideService.getRideToUserPage(localStorage.getItem('_id'))
      .then((rides => {
        this.rides = rides.data;
      }))
      .catch(err => console.error('getRides() failed: ' + err.message));
    this.rideService.getJoinedRideToUserPage(localStorage.getItem('_id'))
      .then((rides => {
        this.joinedRides = rides.data;
      }))
      .catch(err => console.error('getRides() failed: ' + err.message));
  }

  // Poistaa selaimen konsolin virheilmoitukset alustamalla datan 
  // huono fixi, pitää ottaa selvää serviceworkkereista ja välimuistista. 
  defaultUserValues() {
    this.localUser = {
      'user': {
        'firstName': '',
        'lastName': '',
        'email': ''
      }
    }
  }
}
