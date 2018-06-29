import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable }     from 'rxjs/Observable';

import { LoggerService } from './logger.service';
import 'rxjs/add/operator/do';

import { SpinnerService } from '../spinner/spinner.service';
import { NavigationService } from './navigation.service';
import { StorageService } from './storage.service';
import { CommonService } from './common.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor{

  private _pendingRequest = 0;

  constructor(
    private logger : LoggerService,
    private spinnerService : SpinnerService,
    private navigationService : NavigationService,
    private commonService : CommonService,
    private storageService : StorageService
  ){}

  intercept(req : HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    //const modifiedReq = req.clone({headers: req.headers.set('content-type', 'application/json')});
    const modifiedReq = req.clone({withCredentials: true});
    this.onRequest(modifiedReq);
    return next.handle(modifiedReq).do(this.onResponse.bind(this), this.onResponseError.bind(this));
  }

  onResponseError(err : HttpRequest<any>) : void {
    this._pendingRequest--;
    console.log("on res error : -- : ", this._pendingRequest);
    if(this._pendingRequest <= 0){
      this.hideSpinner();
    }
    this.logger.error("On Error : ", err);
    if(err){
      if(err['status'] === 401){
        this.commonService.showInfoMsg("Session time out. Please login to continue.");
        this.storageService.clearLoggedInUserData();
        this.navigationService.redirectToLoginComponent();
      }
      else if(err['status'] === 403){
        this.commonService.showErrorMsg("Access Denied !");
      }
      else if(err['status'] === 0){
        this.commonService.showErrorMsg("Connection Error ! Please try after some time.");
        this.storageService.clearLoggedInUserData();
        this.navigationService.redirectToLoginComponent();
      }
      else{
        this.commonService.showErrorMsg(err['message']);
      }
    }
  }

  onResponse(event){
    if (event instanceof HttpResponse) {
      this._pendingRequest--;
      console.log("On res success : -- : ",this._pendingRequest);
      if(this._pendingRequest <= 0){
        this.hideSpinner();
      }
      this.logger.log('i am intercepting response :D --- ', event);
      if(!event){

      }
    }
  }

  onRequest(req : HttpRequest<any>) : any {
    console.log("i am intercepting req :D --- ", req);
    this._pendingRequest++;
    console.log("new Req- ++ : ", this._pendingRequest);
    this.showSpinner();
  }

  showSpinner(): void{
    this.spinnerService.show();
  }

  hideSpinner(): void{
    this._pendingRequest = 0;
    this.spinnerService.hide();
  }

}
