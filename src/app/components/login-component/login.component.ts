import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { NavigationService } from '../../core/services/navigation.service';
import { LoggerService } from '../../core/services/logger.service';
import { StorageService } from 'app/core/services/storage.service';
import { PermissionService } from 'app/core/services/permission.service';
import { CommonService } from 'app/core/services/common.service';
import { ConstantService } from 'app/core/services/constant.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})

export class LoginComponent implements OnInit {
    returnUrl: string;
    title: string = '5iveC';
    loginInfo: any = {};
    loginErrMsg: any;
    constructor(
        private loginService: LoginService,
        private navigationService: NavigationService,
        private storageService: StorageService,
        private logger: LoggerService,
        private commonService : CommonService,
        private constantService : ConstantService,
        private permissionService : PermissionService
    ) {}

    ngOnInit() {

    }

    login(formName) {
        if(!this.commonService.isFormValid(formName)){
          return;
        }
        this.navigationService.redirectToUserHome();
        // this.loginService.login(this.loginInfo.username, this.loginInfo.password)
        // .subscribe(
        //     data => {
        //         if(!data.successFlag){
        //         this.loginErrMsg = data.errorMsg;
        //         //this.commonService.showErrorMsg(data.errorMsg);
        //         return;
        //         }
        //         this.logger.log('Successfully logged in..');
        //         this.storageService.storeLoginUserData(data.userData);
        //         this.navigationService.redirectToUserHome();
        //     },
        //     error => {
        //         this.logger.log('Some error : ', error);
        //     }
        // );
    }

    forgotPassword() {
        this.navigationService.redirectToForgotPasswordComponent();
    }
}
