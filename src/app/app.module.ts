import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
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
import { AuthGuard } from './services/auth.guard.service';
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
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
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
    ChangePasswordComponent
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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000', 'localhost:4200']
      }
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),

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
    UserService,
    RideService,
    ForgotPasswordService
  ],
  bootstrap: [AppComponent],
  entryComponents: [RideCreateConfirmDialog],
})
export class AppModule { }
