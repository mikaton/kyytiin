import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { emailPattern } from '../../validators/email-validator';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  userEmail: any;
  resetEmailSent: boolean = false;
  resetEmailButtonClicked: boolean = false;
  constructor(private fb: FormBuilder, private forgotPwService: ForgotPasswordService) {
    this.resetPasswordForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailPattern)])],
    });
  }

  ngOnInit() {
  }

  sendPasswordResetLink() {
    this.userEmail = this.resetPasswordForm.value;
    this.resetEmailButtonClicked = true;
    this.forgotPwService.sendResetLink(this.userEmail)
    .then(res => this.resetEmailSent = true)
    .catch(err => console.error('Failed to send password reset email: ' + err.message));
  }
}
