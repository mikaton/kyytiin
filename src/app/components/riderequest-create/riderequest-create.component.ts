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
import { RideRequestService } from '../../services/riderequest.service';

import { RideCreateConfirmDialog } from '../../dialogs/ridecreate-confirm-dialog';
import { Town, towns } from '../ridecreate/town'
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { townMatcher } from '../../validators/town-validator';
import { LocalAuthService } from '../../services/auth.service';
import { ErrorUiService } from '../../services/error-ui.service';

@Component({
  selector: 'app-riderequest-create',
  templateUrl: './riderequest-create.component.html',
  styleUrls: ['./riderequest-create.component.css']
})
export class RiderequestCreateComponent implements OnInit {
  rideCreateConfirmDialogRef: MatDialogRef<RideCreateConfirmDialog>
  rideCreateForm: FormGroup;
  towns: Town[] = towns;
  startingplace: FormControl;
  destination: FormControl;
  filteredStartingplaces: Observable<any[]>;
  filteredDestinations: Observable<any[]>;

  constructor(private rideService: RideService,
    private rideRequestService: RideRequestService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private localAuthService: LocalAuthService,
    private errorUiService: ErrorUiService
  ) {
    
    //Formcontrollit formgroupin ulkopuolella jotta hakutoiminto onnistuisi
    this.startingplace = new FormControl('', [townMatcher])
    this.destination = new FormControl('', [townMatcher]);
    
    //Filtteröi alku- ja lähtöpaikat observableen jotka ladataan HTML:ssä dropdown taulukkoon "startingplace of FilteredStartingplaces"
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
  public max_time = new Date(2020, 1, 1, 1, 1, 1, 1, )
  test_confirmed: boolean

  ngOnInit() {
  }
  //filterifunktiot ylhäällä oleville observableille
  filterStartingplaces(name: string) {
    return this.towns.filter(town =>
      town.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterDestinations(name: string) {
    return this.towns.filter(town =>
      town.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  //tyhjentää formin 
  rebuildForm() {
    this.rideCreateForm.reset({
    })
  }
  createForm() {
    this.rideCreateForm = this.fb.group({
      free_seats: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(20)])],
      pets: [false,],
      smoking: [false,],
      deviate: [false,],
      time_of_departure: [new Date(), Validators.required],
      additional_information: ['', Validators.maxLength(512)],
    });
  }
  openConfirmDialog(ride): Promise<any> {
    this.rideCreateConfirmDialogRef = this.dialog.open(RideCreateConfirmDialog, {
      data: {
        startingplace: ride.startingplace,
        destination: ride.destination,
        time_of_departure: ride.time_of_departure,
        free_seats: ride.free_seats,
        smoking: ride.smoking,
        additional_information: ride.additional_information,
        pets: ride.pets,
        deviate: ride.deviate
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
      .catch((err) => console.error('openConfirmDialog() failed: ' + err.message));
  }
  rideRequestCreate(rideRequestForm, startingplace, destination) {
    const date = new Date(rideRequestForm.time_of_departure);
    rideRequestForm.time_of_departure = date.toISOString();
    rideRequestForm.customer_id = this.updateId();
    rideRequestForm.startingplace = startingplace;
    rideRequestForm.destination = destination;
    this.openConfirmDialog(rideRequestForm)
    .then((confirmed) => {
      if (this.test_confirmed) {
        rideRequestForm.hidden = false;
        if (rideRequestForm.alternate_time_of_departure === undefined) {
          rideRequestForm.alternate_time_of_departure = rideRequestForm.time_of_departure;
        }
        this.rideRequestService.postRequest(rideRequestForm);
        
      }
    })
    .catch((err) => {
      this.errorUiService.popErrorDialog(err);
      console.error('rideRequestForm epäonnistui: ' + err.message)
    });
  };

  updateId() {
    return this.localAuthService.decodeToken();
  }
}
