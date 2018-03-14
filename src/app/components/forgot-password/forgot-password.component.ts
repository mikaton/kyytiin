import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { emailMatcher, emailPattern } from '../../validators/email-validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.resetPasswordForm = fb.group({
      email: this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailPattern)])],
      }, { validator: [emailMatcher] }
      )
    });
  }

  ngOnInit() {
  }

  sendPasswordResetLink(email) {
    
  }
}
