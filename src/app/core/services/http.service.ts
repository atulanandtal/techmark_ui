import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { Observable }     from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService extends HttpClient{

  constructor(private httpHandler : HttpHandler, private http: HttpClient) {
    super(httpHandler);
  }

  uploadFilesToServer (url, formData) {
    let headers = new HttpHeaders();
    headers.append('content-type', 'multipart/form-data');
    return this.http.post<any>(url, formData, {headers: headers, reportProgress: true});
  }

  downloadFilesFromServer(url){
    window.open(url, '_blank');
  }

}
