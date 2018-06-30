import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './components/card.component/card.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { UrlService } from './services/url.service';
import { SharedService } from './services/shared.service';

@NgModule({
  declarations: [
    CardComponent,
    OverlayComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    OverlayComponent
  ],
  providers: [UrlService, SharedService]
})
export class SharedModule { }
