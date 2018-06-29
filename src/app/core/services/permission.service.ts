import { Injectable, Optional } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpService } from 'app/core/services/http.service';
import { ApiUrlService } from 'app/core/services/api-url.service';

@Injectable()
export class PermissionService {
  permissionObj : any;
  activatePermissions = false;
  constructor(
    private storageService : StorageService,
    private httpService : HttpService,
    private apiUrlService : ApiUrlService
  ){
    this.inItPermissions();
  }

  inItPermissions(){
    this.permissionObj = this.getPermissionObj();
  }

  private getPermissionObj(){
    var loggedInUserObj = <any>this.storageService.getLoggedInUser();
    if(!loggedInUserObj){
      return {};
    }
  }

  hasEntityPermission(permissionName, permissionType){
    return true;
  }

  hasPortalPermission(portalType){
    return true;
  }

  checkPermissionType(permissionObj, type) {
    return true;
  }
}
