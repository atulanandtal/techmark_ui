import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from 'app/core/services/navigation.service';
import { HttpService } from 'app/core/services/http.service';
import { ApiUrlService } from 'app/core/services/api-url.service';
import { PasswordService } from '../password.service';
import { CommonService } from 'app/core/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pass-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy{
  private paramSub : any;
  private uuid : any;
  constructor(
      private navigationService: NavigationService,
      private passwordService: PasswordService,
      private commonService: CommonService,
      private route: ActivatedRoute
  ) {}

  ngOnInit(){
    this.paramSub = this.route.params.subscribe(params => {
      this.uuid = params.uuid;
    });
  }

  passwordReset (formObj) {
    if(!this.commonService.isFormValid(formObj)){
      return;
    }
    this.passwordService.resetPassword(formObj.value.password, this.uuid)
      . subscribe(
          data => {
            if(!data.successFlag){
              this.commonService.showErrorMsg(data.errorMsg);
              return;
            }
            this.commonService.showInfoMsg(data.successMsg);
            this.navigationService.redirectToLoginComponent();
          },
          error => {
              console.log('Some error');
          }
      );
  }

  ngOnDestroy(){
    this.paramSub.unsubscribe();
  }
}
