import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/core/services/common.service';
import { MsgModel } from './msg-model';

@Component({
  selector: 'app-msg',
  templateUrl: './app-msg.component.html',
  styleUrls: ['./app-msg.component.css']
})
export class AppMsgComponent implements OnInit{
  private showError = false;
  private showInfo = false;
  private showWarning = false;
  private showSuccess = false;
  private errorMsg = "";
  private infoMsg = "";
  private warningMsg = "";
  private successMsg = "";

  constructor(private commonService : CommonService){

  }

  ngOnInit() : void{
    this.commonService.msgState.subscribe(
      (data : MsgModel ) => {
        this.showError = data.showError;
        this.showInfo = data.showInfo;
        this.showWarning = data.showWarning;
        this.showSuccess = data.showSuccess;
        this.errorMsg = data.errorMsg;
        this.infoMsg = data.infoMsg;
        this.warningMsg = data.warningMsg;
        this.successMsg = data.successMsg;
      }
    )
  }
}
