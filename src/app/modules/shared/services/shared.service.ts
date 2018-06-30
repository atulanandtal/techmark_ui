import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/services/http.service';
import { UrlService } from './url.service';
import 'rxjs/add/operator/map';


@Injectable()
export class SharedService {
    constructor(
      private http: HttpService,
      private api: UrlService
    ) {
    }

    vote(type, postId) {
        return this.http.get<any>(this.api.getVotingUrl(type, postId));
    }

    archive(type, postId) {
        return this.http.get<any>(this.api.getArchiveUrl(type, postId));
    }

    viewCard(postId) {
        return this.http.get<any>(this.api.getViewCardUrl(postId));
    }
}
