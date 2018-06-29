import { Injectable, Optional } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class ApiUrlService {
  baseUrl : String = environment.serverUrl + environment.apiBaseUrl;

  // Login Related Urls
  loginApiUrl: string = this.baseUrl+'/user/login';
  forgotPassApiUrl: string = this.baseUrl+'/user/reset-password';
  changePassApiUrl: string = this.baseUrl+'/user/change-password';
  //changePassApiUrl: string = this.baseUrl+'/test/findByRoles';
  resetPassApiUrl: string = this.baseUrl+'/user/activate-password';
  // Logout
  logoutApiUrl: string = this.baseUrl+'/user/logout';
  
}
