import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http.service';
import { ApiUrlService } from './services/api-url.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { LoggerService } from './services/logger.service';

import { SpinnerComponent } from './spinner/spinner.component';
import { AppMsgComponent } from './app-msg/app-msg.component';

import { SpinnerService } from './spinner/spinner.service';
import { StorageService } from 'app/core/services/storage.service';
import { NavigationService } from 'app/core/services/navigation.service';
import { CommonService } from 'app/core/services/common.service';
import { ConstantService } from 'app/core/services/constant.service';
import { PermissionService } from 'app/core/services/permission.service';

@NgModule({
  declarations: [
    SpinnerComponent,
    AppMsgComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  exports : [
    CommonModule,
    FormsModule,
    SpinnerComponent,
    AppMsgComponent
  ],
  providers: [
    SpinnerService,
    HttpService,
    ApiUrlService,
    LoggerService,
    StorageService,
    NavigationService,
    ConstantService,
    PermissionService,
    CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    }
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
