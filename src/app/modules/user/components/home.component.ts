import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HomeService } from './home.service';
import { ConstantService } from '../../../core/services/constant.service';

@Component({
  selector: 'user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers : [HomeService]
})
export class HomeComponent {
    constructor(
        private titleService : Title,
        private homeService: HomeService,
        private constantService: ConstantService
    ){
        titleService.setTitle("Techmark : Bookmark your technology");
    }

    cardList: any;
    pageCategory: any;

    ngOnInit() {
        this.subscribeList();
    }

    subscribeList(category?) {
        this.pageCategory = category || 'ALL_SHARED';
        this.homeService.getList(this.pageCategory).subscribe(res => {
            console.log(res);
            this.cardList = res.result;
        });
    }
}
