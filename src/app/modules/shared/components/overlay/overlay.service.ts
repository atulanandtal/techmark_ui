import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/services/http.service';
import { UrlService } from '../../services/url.service';
import 'rxjs/add/operator/map';


@Injectable()
export class OverlayService {
    constructor(
      private http: HttpService,
      private api: UrlService
    ) {
    }

    vote(type, postId) {
        return this.http.get<any>(this.api.getVotingUrl(type, postId));
    }
}
