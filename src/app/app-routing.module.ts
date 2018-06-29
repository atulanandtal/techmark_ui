import { NgModule } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { LoginComponent }   from './components/login-component/login.component';
import { PageNotFoundComponent } from './components/page-not-found-component/page-not-found.component';
import { PasswordComponent } from './components/password-component/password.component';
import { ForgotPasswordComponent } from './components/password-component/forgot-component/forgot.component';
import { ResetPasswordComponent } from './components/password-component/reset-component/reset.component';

import { AuthGuard } from './auth-guard.service';
import { LoginGuard } from './login-guard.service';

import { UserModule } from './modules/user/user.module';

const routes : Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'user',
    loadChildren: 'app/modules/user/user.module#UserModule',
  },
  {
    path : '',
    redirectTo : '/login',
    pathMatch : 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        useHash: true,
        // enableTracing: true
      }
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
