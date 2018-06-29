import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './components/card.component/card.component';
import { OverlayComponent } from './components/overlay/overlay.component';

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
  providers: []
})
export class SharedModule { }
