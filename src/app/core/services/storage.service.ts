import { Injectable, Optional } from '@angular/core';

@Injectable()
export class StorageService {
  private dbName = "fcDB";
  private permanentDBName = "fcPermanentDB";

  constructor(){
    this.inItPermanentStorage();
  }

  inItPermanentStorage(){
    let userObj = this.getLoggedInUser();
    if(!userObj){
      return;
    }
    let obj : any = localStorage.getItem(this.permanentDBName);
    obj = obj ? JSON.parse(obj) : {};
    if(obj[userObj.id] == null){
      obj[userObj.id] = {
        isFirstLogin : true
      };
    }
    else {
      obj[userObj.id].isFirstLogin = false;
    }
    localStorage.setItem(this.permanentDBName, JSON.stringify(obj));
  }

  getPermanentStorage(){
    let userObj = this.getLoggedInUser();
    let userId = userObj.id;
    let obj = localStorage.getItem(this.permanentDBName);
    obj = obj ? JSON.parse(obj) : {};
    return obj[userId];
  }

  getData(){
    var storageData : any = localStorage.getItem(this.dbName);
    storageData = storageData ? JSON.parse(storageData) : null;
    return storageData;
  }

  setData(obj) {
    if(obj) {
      localStorage.setItem(this.dbName, JSON.stringify(obj));
    }
    else{
      localStorage.removeItem(this.dbName);
    }
  }

  storeLoginUserData(userObj: any) {
    this.setData(userObj);
    this.inItPermanentStorage();
  }

  getLoggedInUser() {
    return this.getData();
  }

  clearLoggedInUserData() {
      this.setData("");
  }

  isFirstTimeLogin(){
    let isFirstLogin = false;
    let storageObj : any = this.getPermanentStorage();
    if(storageObj){
      isFirstLogin = storageObj.isFirstLogin;
    }
    return isFirstLogin;
  }
}
