import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/services/http.service';
import { UrlService } from '../services/url.service';
import 'rxjs/add/operator/map';


@Injectable()
export class HomeService {
  constructor(
      private http: HttpService,
      private api: UrlService
  ) {
    }

  getList(category) {
      return this.http.get<any>(this.api.getCardList(category));
  }
}
