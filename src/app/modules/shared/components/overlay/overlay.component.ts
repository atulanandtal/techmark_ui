import { Component, Input } from '@angular/core';
import * as $ from 'jquery';
import { DomSanitizer  } from '@angular/platform-browser';
import { OverlayService } from './overlay.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['overlay.css'],
  providers : []
})
export class OverlayComponent {
    @Input() overlayData: any;
    webUrl: any;
    constructor(private sanitizer: DomSanitizer, private sharedService: SharedService ){
        
    }

    ngOnInit() {}

    initOverlay(overlayData) {
        if(!overlayData) {
            return;
        }
        this.webUrl = this.sanitizer.bypassSecurityTrustResourceUrl(overlayData.url);
        this.overlayData = overlayData;
        console.log(this.webUrl);
        document.getElementById("overlay").style.display = "block";
    }

    removeOverlay() {
        document.getElementById("overlay").style.display = "none";
    }

    onVoteClick(type, postId) {
        // this.overlayData.like = !this.overlayData.like;
        this.sharedService.vote(type, postId).subscribe(res => {
            console.log(res);
        });
    }
}
