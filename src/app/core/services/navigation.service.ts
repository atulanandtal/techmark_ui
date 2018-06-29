import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from 'app/core/services/constant.service';

@Injectable()
export class NavigationService {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public constantService : ConstantService
  ) { }

  redirectToUserHome() {
    this.router.navigate(['/user/home']);
  }

  redirectToForgotPasswordComponent() {
    this.router.navigate(['/password/forgot']);
  }

  redirectToLoginComponent() {
    this.router.navigate(['/login']);
  }

  redirectToResetPasswordComponent() {
    this.router.navigate(['/password/reset']);
  }

}
