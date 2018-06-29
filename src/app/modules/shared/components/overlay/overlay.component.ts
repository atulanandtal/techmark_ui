import { Component, Input } from '@angular/core';
import * as $ from 'jquery';
import { DomSanitizer  } from '@angular/platform-browser';

@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['overlay.css'],
  providers : []
})
export class OverlayComponent {
    @Input() overlayData: any;
    webUrl: any;
    constructor(private sanitizer: DomSanitizer ){
        
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
}
