import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home.component';
import { UserRoutingModule } from './user.routing.module';
import { UrlService } from './services/url.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: [UrlService]
})
export class UserModule { }
