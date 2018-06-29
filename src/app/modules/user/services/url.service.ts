import { Injectable } from '@angular/core';

import { ApiUrlService } from 'app/core/services/api-url.service';
import { StorageService } from 'app/core/services/storage.service';

@Injectable()
export class UrlService extends ApiUrlService{

  getCardList(category) {
      // return '/assets/jsons/sample.json';
    let obj = JSON.parse(localStorage.getItem("fcDB"));
    console.log(obj.userId);
    return this.baseUrl+'/posts/'+category+'/'+obj.userId;
  }
}
