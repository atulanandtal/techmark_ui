import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './components/card.component/card.component';

@NgModule({
  declarations: [
    CardComponent
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
    CardComponent
  ],
  providers: []
})
export class SharedModule { }
