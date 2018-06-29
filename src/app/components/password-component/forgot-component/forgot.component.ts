import { Component } from '@angular/core';
import { NavigationService } from 'app/core/services/navigation.service';
import { CommonService } from 'app/core/services/common.service';
import { PasswordService } from '../password.service';
import { ConstantService } from 'app/core/services/constant.service';

@Component({
  selector: 'pass-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordObj = {};
  apiErrMsg : any;
  constructor(
      private navigationService: NavigationService,
      private passwordService: PasswordService,
      private commonService: CommonService,
      private constantService : ConstantService
  ) {}

  forgotPassword (form) {
    if(!this.commonService.isFormValid(form)){
      return;
    }
    this.passwordService.forgotPassword(form.value)
      . subscribe(
        data => {
          console.log(data);
          if(!data.successFlag){
            //this.commonService.showErrorMsg(data.errorMsg);
            this.apiErrMsg = data.errorMsg;
            return;
          }
          this.commonService.showSuccessMsg(data.successMsg);
          this.navigationService.redirectToLoginComponent();
        },
        error => {
          console.log('Some error');
        }
      );
  }
}
