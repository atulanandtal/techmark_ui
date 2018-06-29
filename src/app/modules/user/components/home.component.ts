import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HomeService } from './home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../../core/services/constant.service';
import * as $ from 'jquery';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers : [HomeService]
})
export class HomeComponent {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private titleService : Title,
        private homeService: HomeService,
        private constantService: ConstantService,
        private navigationService: NavigationService
    ){
        titleService.setTitle("Techmark : Bookmark your technology");
    }

    cardList: any;
    pageCategory: any;

    @ViewChild(OverlayComponent) overlayRef: OverlayComponent

    ngOnInit() {
        this.subscribeList();
        $(document).ready(function () {

            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        
        });
    }

  subscribeParams(){
    this.activatedRoute.queryParams.subscribe(query=>{
      console.log(query);
      let userId = query.userId;
    });
  }

    subscribeList(category?) {
        this.pageCategory = category || 'ALL_SHARED';
        this.homeService.getList(this.pageCategory).subscribe(res => {
            console.log(res);
            this.cardList = res.result;
        });
    }

    onCardClicked(e) {
        this.overlayRef.initOverlay(e);
    }
    onLogout() {
        this.navigationService.redirectToLoginComponent();
    }
}
