import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { RidelistComponent } from './components/ridelist/ridelist.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { AuthGuard } from './guards/auth.guard.service';
import { IdGuard } from './guards/id.guard.service';
import { RidecreateComponent } from './components/ridecreate/ridecreate.component';
import { RideComponent } from './components/ride/ride.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { JoinRequestListComponent } from './components/join-request-list/join-request-list.component';
import { JoinRequestComponent } from './components/join-request/join-request.component';
import { RegistersuccessComponent } from './components/registersuccess/registersuccess.component';
import { TosComponent } from './components/tos/tos.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UserMadeRideComponent } from './components/user-made-ride/user-made-ride.component';
import { RiderequestCreateComponent } from './components/riderequest-create/riderequest-create.component';
import { RiderequestComponent } from './components/riderequest/riderequest.component';
import { RideformholderComponent } from './components/rideformholder/rideformholder.component';
import { RidelistholderComponent } from './components/ridelistholder/ridelistholder.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'rides', component: RidelistholderComponent },
  { path: 'rides/:ride_id', canActivate: [AuthGuard], component: RideComponent},
  { path: 'frontpage', component: FrontpageComponent },
  { path: 'user', canActivate: [AuthGuard], component: UserpageComponent},
  { path: 'user/:customer_id', canActivate: [AuthGuard], component: UserdetailsComponent},
  { path: 'requests', canActivate: [AuthGuard], component: JoinRequestListComponent},
  { path: 'request/:id', canActivate: [AuthGuard], component: JoinRequestComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'change-password/:token', component: ChangePasswordComponent},
  { path: 'feedback', component: FeedbackComponent},
  { path: 'register-success', component: RegistersuccessComponent},
  { path: 'tos', component: TosComponent},
  { path: 'verify-account/:token', component: VerifyEmailComponent},
  { path: 'user-rides/:ride_id', component: UserMadeRideComponent},
  { path: 'register', component: AuthDialogComponent},
  { path: 'riderequestcreate', component: RiderequestCreateComponent},
  { path: 'riderequest/:request_id', component: RiderequestComponent},
  { path: 'ridecreate', component: RideformholderComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
