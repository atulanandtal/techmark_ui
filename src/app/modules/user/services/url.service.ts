import { Injectable } from '@angular/core';

import { ApiUrlService } from 'app/core/services/api-url.service';

@Injectable()
export class UrlService extends ApiUrlService{

  getCardList(category) {
      return '/assets/jsons/sample.json';
  }
}
