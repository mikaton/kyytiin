import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LocalAuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { RideService } from '../../services/ride.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
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
    private rideService: RideService,
    private reviewService: ReviewService,
    private fb: FormBuilder) { }
  localUser: any;
  rides = [];
  customer_id: any;
  canReview: boolean;
  reviewForm: FormGroup;

  ngOnInit() {
    this.canReview = false;
    this.customer_id = this.route.snapshot.paramMap.get('customer_id');
    this.defaultUserValues();
    this.getUserData();
    this.allowReview()
    this.createForm()
  }
  createForm() {
    //if (this.canReview) {
      this.reviewForm = this.fb.group({
        stars: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(5)])],
        review_text: ['', Validators.maxLength(512)],
        customer_id: [this.customer_id],
      });
    //}
  }

  getUserData() {
    this.userService.getUser(this.customer_id)
      .then(localUser => this.localUser = localUser)
  }

  allowReview() {
    this.reviewService.allowReview(this.customer_id, localStorage.getItem('_id'))
      .then(response => this.canReview = true)
      .catch(err => console.error('allowReview() failed: ' + err.message));
    }
  sendReview(reviewForm) {
    console.log(reviewForm);
    this.reviewService.sendReview(reviewForm)
      .then(response => console.log('ok'))
      .catch(err => console.error('sendReview() failed: ' + err.message));
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

