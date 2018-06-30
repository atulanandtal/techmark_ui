import { Injectable } from '@angular/core';
import { ApiUrlService } from 'app/core/services/api-url.service';

@Injectable()
export class UrlService extends ApiUrlService{

    getVotingUrl(type, postId) {
        if(type=='like') {
            return this.baseUrl+'/post/increment/'+postId;
        }
        else {
            return this.baseUrl+'/post/decrement/'+postId;
        }
    }
}
