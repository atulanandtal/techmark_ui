/**
 * Created by Jagdeeps on 14-09-2017.
 */
import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from 'app/core/services/storage.service';
import { ConstantService } from 'app/core/services/constant.service';
import { NavigationService } from 'app/core/services/navigation.service';
import { PermissionService } from 'app/core/services/permission.service';
import { CommonService } from 'app/core/services/common.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private storageService : StorageService,
    private constantService : ConstantService,
    private navigationService : NavigationService,
    private permissionService : PermissionService,
    private commonService : CommonService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
    return true;
  }
}
