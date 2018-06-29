import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['card.css'],
  providers : []
})
export class CardComponent {
    @Input() cardData: any;
    cardStyle: any;
    constructor(){
        
    }

    ngOnInit() {
        this.cardStyle = {
            // 'background-image': 'url('+this.cardData.imageUrl+')',
            'width': '100%',
            'height.px': 300,
            'overflow': 'hidden',
            'color': 'black',
            'padding': '12px',
            'margin': '15px'
        };
    }
}
