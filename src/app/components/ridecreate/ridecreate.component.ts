import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { VERSION, MatDialog, MatDialogRef } from '@angular/material';
import { RideService } from '../../services/ride.service';
import { RideCreateConfirmDialog } from '../../dialogs/ridecreate-confirm-dialog';
import { Town, towns } from './town'
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-ridecreate',
  templateUrl: './ridecreate.component.html',
  styleUrls: ['./ridecreate.component.css']
})
export class RidecreateComponent implements OnInit {
  rideCreateConfirmDialogRef: MatDialogRef<RideCreateConfirmDialog>
  rideCreateForm: FormGroup;
  towns: Town[] = towns;
  startingplace: FormControl;
  destination: FormControl;
  filteredStartingplaces: Observable<any[]>;
  filteredDestinations: Observable<any[]>;

  constructor(private rideService: RideService,
    private dialog: MatDialog,
    private fb: FormBuilder) {

    this.startingplace = new FormControl();
    this.destination = new FormControl();
    this.filteredStartingplaces = this.startingplace.valueChanges
      .pipe(
        startWith(''),
        map(town => town ? this.filterStartingplaces(town) : this.towns.slice())
      );
    this.filteredDestinations = this.destination.valueChanges
      .pipe(
        startWith(''),
        map(town => town ? this.filterDestinations(town) : this.towns.slice())
      )
    this.createForm();
  };

  public min_time = new Date();
  public max_time = new Date(2022, 1, 1, 1, 1, 1, 1, )
  test_confirmed: boolean

  ngOnInit() {
  }

  filterStartingplaces(name: string) {
    return this.towns.filter(town =>
      town.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterDestinations(name: string) {
    return this.towns.filter(town =>
      town.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  rebuildForm() {
    this.rideCreateForm.reset({
    })
  }
  log() {
    console.log(this.rideCreateForm);
    console.log(this.startingplace.value);
  }
  createForm() {
    this.rideCreateForm = this.fb.group({
      free_seats: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(20)])],
      pets: [false,],
      smoking: [false,],
      time_of_departure: [new Date(), Validators.required],
      time_of_arrival: [new Date(), Validators.required],
    }); this.startingplace
  }

  openConfirmDialog(ride): Promise<any> {
    this.rideCreateConfirmDialogRef = this.dialog.open(RideCreateConfirmDialog, {
      data: {
        startingplace: ride.startingplace,
        destination: ride.destination,
        time_of_departure: ride.time_of_departure,
        time_of_arrival: ride.time_of_arrival,
        free_seats: ride.free_seats,
        smoking: ride.smoking,
        pets: ride.pets
      }
    })
    return this.rideCreateConfirmDialogRef.afterClosed().toPromise()
      .then(confirmed => {
        if (confirmed != undefined) {
          this.test_confirmed = true;
        } else {
          this.test_confirmed = false;
        }
      })
      .catch((err) => Promise.reject(err));
  }

  rideCreate(rideCreateForm, startingplace, destination) {
    const date = new Date();
    rideCreateForm.time_of_arrival = date.toISOString();
    rideCreateForm.time_of_departure = date.toISOString();
    rideCreateForm.customer_id = this.updateId();
    rideCreateForm.startingplace = startingplace;
    rideCreateForm.destination = destination;
    this.openConfirmDialog(rideCreateForm)
    .then((confirmed) => {
      if (this.test_confirmed) {
        rideCreateForm.hidden = false;
        if (rideCreateForm.alternate_time_of_departure === undefined) {
          rideCreateForm.alternate_time_of_departure = rideCreateForm.time_of_departure;
        }
        if (rideCreateForm.alternate_time_of_arrival === undefined) {
          rideCreateForm.alternate_time_of_arrival = rideCreateForm.time_of_arrival;
        }
        this.rideService.postRides(rideCreateForm);
      }
    })
  };

  updateId() {
    return localStorage.getItem('_id')
  }
}