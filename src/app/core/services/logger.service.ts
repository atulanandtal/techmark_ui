import { Injectable } from '@angular/core';

declare var console: any;

@Injectable()
export class LoggerService{

  public error(...args: any[]): void {
    (console && console.error) && console.error(...args);
  }

  public info(...args: any[]): void {
    (console && console.info) && console.info(...args);
  }

  public log(...args: any[]): void {
    (console && console.log) && console.log(...args);
  }


  public warn(...args: any[]): void {
    (console && console.warn) && console.warn(...args);
  }
}
