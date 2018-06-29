import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SpinnerState } from './spinner-state';

@Injectable()
export class SpinnerService {
  private spinnerSubject = new Subject<SpinnerState>();
  spinnerState = this.spinnerSubject.asObservable();

  show() : void {
    this.spinnerSubject.next(<SpinnerState>{show : true});
  }

  hide() : void {
    this.spinnerSubject.next(<SpinnerState>{show : false});
  }
}
