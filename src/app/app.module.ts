import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/* Core Module */
import { CoreModule } from './core/core.module';
/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

import { UserModule } from './modules/user/user.module';

/* Feature Component */
import { AppComponent } from './components/app-component/app.component';
import { PageNotFoundComponent } from './components/page-not-found-component/page-not-found.component';
import { LoginComponent } from './components/login-component/login.component';
import { PasswordComponent } from './components/password-component/password.component';
import { ForgotPasswordComponent } from './components/password-component/forgot-component/forgot.component';
import { ResetPasswordComponent } from './components/password-component/reset-component/reset.component';
import { SharedModule } from './modules/shared/shared.module';


import { AuthGuard } from './auth-guard.service';
import { LoginGuard } from './login-guard.service';
/* Services */
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    SharedModule
  ],
  providers: [AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
