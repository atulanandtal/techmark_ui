/**
 * Created by Jagdeeps on 14-09-2017.
 */
import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from 'app/core/services/storage.service';
import { NavigationService } from 'app/core/services/navigation.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private storageService : StorageService,
    private navigationService : NavigationService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
    return true;
  }
}
