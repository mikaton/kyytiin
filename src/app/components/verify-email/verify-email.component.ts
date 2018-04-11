import { Component, OnInit } from '@angular/core';
import { LocalAuthService } from '../../services/auth.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { ErrorUiService } from '../../services/error-ui.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    private localAuthService: LocalAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private errorUiService: ErrorUiService
  ) {
  }

  async ngOnInit() {
    await this.verifyEmail()
  }
  verifyEmail() {
    const token = this.route.snapshot.paramMap.get('token');
    console.log(token)
    this.localAuthService.verifyEmail(token)
      .catch((err) => {
        this.errorUiService.popErrorDialog(err)
      })
  }
}