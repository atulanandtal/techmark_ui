import { Injectable } from '@angular/core';
import { FormArray, FormGroup} from '@angular/forms';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { MsgModel } from '../app-msg/msg-model';
import { ConstantService } from 'app/core/services/constant.service';

@Injectable()
export class CommonService {
  private msgSubject = new Subject<MsgModel>();
  msgState = this.msgSubject.asObservable();
  timeInterval = 3000;
  showConfirmationDlg : any;
  dummyFlexSheetInstance : any;
  tempObservableRef : any;
  private decimalPipe = new DecimalPipe('en-US');
  private percentPipe = new PercentPipe('en-US');
  constructor(
    private constantService: ConstantService
  ) {}

  showConfirmationAlert(dataObj){
    if(this.showConfirmationDlg && typeof this.showConfirmationDlg == 'function'){
      return this.showConfirmationDlg({
        title : dataObj.title,
        message : dataObj.message
      });
    }
    else{
      this.showErrorMsg("Oops ! Confirmation dialogue is not configured");
    }
  }

  registerConfirmationAlert(confirmationCallBack){
    if(confirmationCallBack && typeof confirmationCallBack == 'function'){
      this.showConfirmationDlg = confirmationCallBack;
    }
  }

  showErrorMsg(msg : string, timeInterval?) : void {
    timeInterval = timeInterval ? timeInterval : this.timeInterval;
    this.msgSubject.next(<MsgModel>{showError:true, errorMsg : msg});
    var timeout = setTimeout(()=>{
      this.msgSubject.next(<MsgModel>{showError:false, errorMsg : ''});
      clearTimeout(timeout);
    }, timeInterval)
  }

  showSuccessMsg(msg : string, timeInterval?) : void {
    timeInterval = timeInterval ? timeInterval : this.timeInterval;
    this.msgSubject.next(<MsgModel>{showSuccess:true, successMsg : msg});
    var timeout = setTimeout(()=>{
      this.msgSubject.next(<MsgModel>{showSuccess:false, successMsg : ''});
      clearTimeout(timeout);
    }, timeInterval)
  }

  showInfoMsg(msg : string) : void {
    this.msgSubject.next(<MsgModel>{showInfo:true, infoMsg : msg});
    var timeout = setTimeout(()=>{
      this.msgSubject.next(<MsgModel>{showInfo:false, infoMsg : ''});
      clearTimeout(timeout);
    }, this.timeInterval)
  }

  showWarningMsg(msg : string) : void {
    this.msgSubject.next(<MsgModel>{showWarning:true, warningMsg : msg});
    var timeout = setTimeout(()=>{
      this.msgSubject.next(<MsgModel>{showWarning:false, warningMsg : ''});
      clearTimeout(timeout);
    }, this.timeInterval)
  }

  isFormValid(formName, isReactiveForm = true){
    if(!formName){
      return false;
    }
    if(isReactiveForm){
      let formControls = Object.keys(formName.controls);
      formControls.forEach(control=>{
        if(formName.controls[control] instanceof FormArray){
          formName.controls[control].controls.forEach(formGroupObj => {
            this.isFormValid(formGroupObj);
          });
        }
        formName.controls[control].invalid ? formName.controls[control].markAsDirty(): "Do Nothing";
      });
      return formName.valid;
    }
  }

  formatDateForForms(epoch, format?){
    if(!epoch){
      return epoch;
    }
    if(!format){
      format = this.constantService.inputDateFormat
    }
    let dateObj = new Date(parseInt(epoch));
    let newFormat;
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let date = dateObj.getDate();
    switch (format){
      case "mm/dd/yyyy" :
      case "MM/DD/YYYY" :
            newFormat = month+"/"+date+"/"+year;
            break;
      case "dd/mm/yyyy" :
      case "DD/MM/YYYY" :
            newFormat = date+"/"+month+"/"+year;
            break;
      case "yyyy/mm/dd" :
      case "YYYY/MM/DD" :
            newFormat = year+"/"+month+"/"+date;
            break;
    }
    return newFormat;
  }

  parseDateForApi(dateVal, format?){
    if(!dateVal){
      return dateVal;
    }
    if(!format){
      format = this.constantService.inputDateFormat
    }
    let apiVal;
    let year, month, date;
    switch (format){
      case "mm/dd/yyyy" :
      case "MM/DD/YYYY" :
        month = parseInt(dateVal.split("/")[0]);
        date = parseInt(dateVal.split("/")[1]);
        year = parseInt(dateVal.split("/")[2]);
        break;
      case "dd/mm/yyyy" :
      case "DD/MM/YYYY" :
        date = parseInt(dateVal.split("/")[0]);
        month = parseInt(dateVal.split("/")[1]);
        year = parseInt(dateVal.split("/")[2]);
        break;
      case "yyyy/mm/dd" :
      case "YYYY/MM/DD" :
        year = parseInt(dateVal.split("/")[0]);
        month = parseInt(dateVal.split("/")[1]);
        date = parseInt(dateVal.split("/")[2]);
        break;
    }
    apiVal = new Date(month+"/"+date+"/"+year).getTime();
    return apiVal;
  }

  evaluateFormula(str){
    if(str.indexOf("/") != -1 || str.indexOf("*") != -1){
      return this.dummyFlexSheetInstance.evaluate(str);
    }
    else{
      let formattedVal = str.toString().replace(/null|undefined/g, 0);
      return this.dummyFlexSheetInstance.evaluate(formattedVal);
    }
  }

  formatNumber(val){
    //console.log(this.decimalPipe.transform("12345.00"));
    if(!val) {
      return null;
    }
    val = this.unFormatNumber(val);
    if(val.indexOf(".") != -1){
      let valToFormat = val.split(".");
      let formattedMainPart = valToFormat[0] ? this.decimalPipe.transform(valToFormat[0]) : '';
      let roundedValue = this.roundFractionalPart(val, valToFormat[1].length, 2);
      let roundedDecimalPart = roundedValue.split(".");
      return formattedMainPart + "." + roundedDecimalPart[1];
    }
    else{
      return val ? this.decimalPipe.transform(val) : null;
    }
  }

  formatMoney(val, finalFormatting?){
    if(val == null || val == "") {
      return;
    }
    val = this.unFormatNumber(val);
    let isValNegative = false;
    if(parseFloat(val) < 0){
      isValNegative = true;
    }
    let processedVal;
    if(val.indexOf(".") != -1){
      let valToFormat = val.split(".");
      let formattedMainPart = valToFormat[0] ? this.decimalPipe.transform(valToFormat[0]) : '';
      let roundedValue = this.roundFractionalPart(val, valToFormat[1].length, 2, finalFormatting);
      let roundedDecimalPart = roundedValue.split(".");
      processedVal = formattedMainPart + "." + roundedDecimalPart[1];
    }
    else{
      processedVal = val ? this.decimalPipe.transform(val) : null;
      if(finalFormatting) {
        processedVal = val ? this.decimalPipe.transform(val) + '.00' : null;
      }
    }
    if(processedVal != null){
      processedVal = isValNegative ? processedVal.replace("-", "-$") : "$"+ processedVal;
    }
    return processedVal;
  }

  formatInteger(val) {
    if(val == null || val == "") {
      return null;
    }
    val = this.unFormatNumber(val);
    return this.decimalPipe.transform(parseInt(val));
  }

  formatPercent(val){
    if(val == null || val == "") {
      return null;
    }
    val = this.unFormatNumber(val);
    if(isNaN(parseFloat(val))){
      return null;
    }
    return parseFloat(val).toFixed(3) + " %";
  }

  unFormatNumber(val){
    // return val ? val.toString().replace(/,|\s|\$|\%|[^\d]/g, "") : null;
    return val != null ? val.toString().replace(/,|\s|\$|\%|[^\d|\-|\.]/g, "") : null;
  }

  roundFractionalPart(val, currentLength, requiredLength, finalFormatting?) {
    if(currentLength > requiredLength) {
      return parseFloat(val).toFixed(requiredLength);
    }
    else {
      if(finalFormatting) {
        for(let i=1; i<=(requiredLength-currentLength); i++) {
          val += '0';
        }
        val = parseFloat(val).toFixed(requiredLength)
      }
      return val;
    }
  }

  addPercentSignAtLast(val) {
    return val + '%';
  }

  isFileTypeAllowed(file, type?) {
    let patt = new RegExp("(.*)\\.(.*)");
    let res = patt.exec(file.name);
    let extractedFileType = res[2];
    if(type == 'IMAGE' || !type) {
      if(this.constantService.imageTypeAllowed.indexOf(extractedFileType) > -1) {
        return true;
      }
      else {
        return file.name;
      }
    }
    else if(type == 'DOCUMENT'){
      if(this.constantService.documentTypeAllowed.indexOf(extractedFileType) > -1) {
        return true;
      }
      else {
        return file.name;
      }
    }
  }
}
