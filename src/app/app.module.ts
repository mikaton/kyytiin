import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatTableModule,
} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatNavList } from '@angular/material';
import { AppComponent } from './app.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { LocalAuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { UserpageComponent } from './components/userpage/userpage.component';
import { RidelistComponent } from './components/ridelist/ridelist.component';
import { AppRoutingModule } from './/app-routing.module';
import { AuthGuard } from './guards/auth.guard.service';
import { IdGuard } from './guards/id.guard.service';
import { UserService } from './services/user.service';
import { RideService } from './services/ride.service';
import { RidecreateComponent } from './components/ridecreate/ridecreate.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { FilterPipe } from './pipes/filter.pipe';
import { registerLocaleData } from '@angular/common';
import localeFi from '@angular/common/locales/fi';
import { FaqComponent } from './components/faq/faq.component';
import { RideComponent } from './components/ride/ride.component';
import { RideCreateConfirmDialog } from './dialogs/ridecreate-confirm-dialog';
import { ErrorDialog } from './dialogs/error-dialog';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { ReviewService } from './services/review.service';
import { StarRatingModule } from 'angular-star-rating';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { JoinRequestComponent } from './components/join-request/join-request.component';
import { JoinRequestListComponent } from './components/join-request-list/join-request-list.component';
import { JoinRequestService } from './services/joinrequest.service';
import { NotificationService } from './services/notification.service';
import { RegistersuccessComponent } from './components/registersuccess/registersuccess.component';
import { ErrorUiService } from './services/error-ui.service';
import { TosComponent } from './components/tos/tos.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ChangelogComponent } from './components/changelog/changelog.component';
import { UserMadeRideComponent } from './components/user-made-ride/user-made-ride.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

registerLocaleData(localeFi);

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('691489097907293')
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('17252589091-6oo0fkmqg0bq5js9b2fc8ued4pavfnfd.apps.googleusercontent.com')
  }
]);
export function provideConfig() {
  return config;
}

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    AuthDialogComponent,
    UserpageComponent,
    RidelistComponent,
    RidecreateComponent,    
    FilterPipe,
    FaqComponent,
    RideCreateConfirmDialog,
    RideComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    FeedbackComponent,
    UserdetailsComponent,
    ErrorDialog,
    JoinRequestComponent,
    JoinRequestListComponent,
    RegistersuccessComponent,
    TosComponent,
    VerifyEmailComponent,
    ChangelogComponent,
    UserMadeRideComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTableModule,
    LayoutModule,
    SocialLoginModule,
    HttpClientModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatListModule,
    FlexLayoutModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule,
    NgxTwitterTimelineModule,
    StarRatingModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['165.227.141.110', 'http://165.227.141.110', 'localhost:3000', 'localhost:4200', 'https://kyyti.in', 'https://www.kyyti.in', 'kyyti.in', 'www.kyyti.in']
      }
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDqangYtXtjWcjB_CcZ4iICC8g2w3j4lEs'
    }),
    AgmDirectionModule

  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    { 
      provide: LOCALE_ID, useValue: 'fi'
    },
    LocalAuthService,
    AuthGuard,
    IdGuard,
    UserService,
    RideService,
    ForgotPasswordService,
    ReviewService,
    JoinRequestService,
    NotificationService,
    ErrorUiService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [RideCreateConfirmDialog, ErrorDialog],
})
export class AppModule { }
