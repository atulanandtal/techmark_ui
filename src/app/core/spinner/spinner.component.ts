import { Component,OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SpinnerService } from './spinner.service';
import { SpinnerState } from './spinner-state';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy, OnInit {

  private show = false;
  private spinnerStateSubscription : Subscription;
  constructor(private spinnerService : SpinnerService){}

  ngOnInit() : void {
    this.spinnerStateSubscription = this.spinnerService.spinnerState.subscribe((state : SpinnerState) => {
      this.show = state.show;
    }, err => console.log("error ", err));
  }

  ngOnDestroy() : void {
    this.spinnerStateSubscription.unsubscribe();
  }

}
