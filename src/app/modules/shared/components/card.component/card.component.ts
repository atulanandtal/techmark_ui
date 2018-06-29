import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['card.css'],
  providers : []
})
export class CardComponent {
    @Input() cardData: any;
    cardStyle: any;
    @Output() cardClicked = new EventEmitter();
    constructor(){
        
    }

    ngOnInit() {
        this.cardStyle = {
            // 'background-image': 'url('+this.cardData.imageUrl+')',
            'width': '100%',
            'height.px': 300,
            'overflow': 'hidden',
            'color': 'black',
            'padding': '12px 0px',
            'margin': '15px 0px'
        };
    }

    onCardClick(card) {
        this.cardClicked.emit(card);
    }
}
