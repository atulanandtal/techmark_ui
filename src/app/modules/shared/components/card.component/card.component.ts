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
    defaultValues = {
        title: 'Sample Title',
        subtitle: 'Sample Subtitle',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "url": "https://www.lipsum.com/",
        "imageUrl": "assets/images/article_submission.jpg",
        "sharedBy": "Anonymous",
        "estimatedMinutes": "1 minute",
        "like": false
    }
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
        //card.title = card.title || this.defaultValues.title;
        //card.subTitle = card.title || this.defaultValues.subtitle;
        //card.imageUrl = card.imageUrl || this.defaultValues.imageUrl;
        //card.description = card.description || this.defaultValues.description;
        //this.cardClicked.emit(card);
        window.open(card.url);
    }
}
