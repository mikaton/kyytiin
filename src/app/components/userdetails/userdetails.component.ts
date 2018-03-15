import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LocalAuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { RideService } from '../../services/ride.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private localAuthService: LocalAuthService,
    private rideService: RideService) {}
    localUser: any;
    rides = [];

  ngOnInit() {

    this.defaultUserValues();
    this.getUserData();
  }

  getUserData() {
    const customer_id = this.route.snapshot.paramMap.get('customer_id');
    this.userService.getUser(customer_id).then(localUser => this.localUser = localUser)
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

