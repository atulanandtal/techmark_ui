import { Injectable } from '@angular/core';
import { ApiUrlService } from 'app/core/services/api-url.service';

@Injectable()
export class UrlService extends ApiUrlService{

    getVotingUrl(type, postId) {
        let obj = JSON.parse(localStorage.getItem("fcDB"));
        // console.log(obj.userId);
        if(type=='like') {
            return this.baseUrl+'/post/increment/'+postId+'/'+obj.userId;
        }
        else {
            return this.baseUrl+'/post/decrement/'+postId+'/'+obj.userId;
        }
    }

    getArchiveUrl(type, postId) {
        let obj = JSON.parse(localStorage.getItem("fcDB"));
        // console.log(obj.userId);
        if(type=='archive') {
            return this.baseUrl+'/post/archive/'+postId+'/'+obj.userId;
        }
        else {
            return this.baseUrl+'/post/unarchive/'+postId+'/'+obj.userId;
        }
    }

    getViewCardUrl(postId) {
        let obj = JSON.parse(localStorage.getItem("fcDB"));
        return this.baseUrl+'/post/'+postId+'/'+obj.userId;
    }
}
