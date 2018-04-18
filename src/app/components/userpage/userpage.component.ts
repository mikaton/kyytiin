import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LocalAuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { RideService } from '../../services/ride.service';
import { ErrorUiService } from '../../services/error-ui.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  constructor(
    private userService: UserService,
    private localAuthService: LocalAuthService,
    private rideService: RideService,
    private fb: FormBuilder,
    private errorUiService: ErrorUiService
  ) { }

  localUser: any;
  rides = [];
  joinedRides = [];
  customerEditForm: FormGroup;

  async ngOnInit() {
    await Promise.all([this.defaultUserValues(), this.updateUserdata(), this.getRides(), this.createForm()
    ]);
  }
  createForm() {
    this.customerEditForm = this.fb.group({
      phoneNumber: ['', [Validators.pattern("^[0-9]{8,10}")]],
    });
  }
  get phoneNumber() { return this.customerEditForm.get('phoneNumber')};

  
  patchUser(customerEditForm) {
    console.log(customerEditForm);
    this.localAuthService.decodeToken();
    this.userService.patchUserData(customerEditForm)
      .then((result) =>  this.updateUserdata()) 
      .catch((err) => {
        this.errorUiService.popErrorDialog(err);
        console.error('patchUser epäonnistui: ' + err.message)
      });
    }

  updateUserdata() {
    this.userService.getUser(this.localAuthService.decodeToken())
      .then((result) => {
        this.localUser = result;
      })
      .catch((err) => {
        this.errorUiService.popErrorDialog(err);
        console.error('updateUserData epäonnistui: ' + err.message)
      });
    }

  getRides() {
    this.rideService.getRideToUserPage(this.localAuthService.decodeToken())
      .then((rides => {
        this.rides = rides.data;
      }))
      .catch(err => console.error('getRides() failed: ' + err.message));
    this.rideService.getJoinedRideToUserPage(this.localAuthService.decodeToken())
      .then((rides => {
        this.joinedRides = rides.data;
      }))
      .catch((err) => {
        this.errorUiService.popErrorDialog(err);
        console.error('getRides epäonnistui: ' + err.message)
      });
    }

  // Poistaa selaimen konsolin virheilmoitukset alustamalla datan 
  // huono fixi, pitää ottaa selvää serviceworkkereista ja välimuistista. 
  defaultUserValues() {
    this.localUser = {
      'user': {
        'firstName': '',
        'lastName': '',
        'email': '',
        'phoneNumber': '',
        'customer_id':'',
      }
    }
  }
}
