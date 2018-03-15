import { Component, OnInit, ErrorHandler } from '@angular/core';
import { passwordMatcher } from '../../validators/password-validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  passwordChanged: boolean = false;

  constructor(
      private fb: FormBuilder,
      private forgotPasswordService: ForgotPasswordService,
      private route: ActivatedRoute) {
    this.changePasswordForm = this.fb.group({
      password: this.fb.group({
        pwd: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        confirmPwd: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      }, { validator: passwordMatcher })
    });
  }

  ngOnInit() {
  }

  changePassword(newPassword: string, token: string) {
    // Lähetetään uusi salasana ja token backendiin
    token = this.route.snapshot.params.token;
    console.log(token);
    this.forgotPasswordService.changePassword(newPassword, token)
    .then(
      res => this.passwordChanged = true
    );
  }
}
