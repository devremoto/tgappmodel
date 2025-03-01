// models imports/////////////////////////////////
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthCanActivateGuard } from './auth-can-activate.guard';
import { LoginCallBackComponent } from './callback';
import { AuthInterceptor } from './interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountService } from './account.service';
import { UnauthorizedComponent } from './unauthorized.component';
import { LoginComponent } from './login/login.component';
import { AuthServiceFactory } from './services/auth-service-factory';
import { FormsModule } from '@angular/forms';
import { LanguageCustomService } from '../services/custom/Language';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';
import { SessionStorageService } from '../shared/util/session-storage.service';

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'callback', component: LoginCallBackComponent },
      { path: 'unauthorized/:id', component: UnauthorizedComponent }
    ]),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  providers: [
    { provide: AuthService, useFactory: AuthServiceFactory.resolver, deps: [Router, SessionStorageService] },
    AuthCanActivateGuard,
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  declarations: [LoginCallBackComponent, UnauthorizedComponent, LoginComponent],
  exports: [LoginCallBackComponent]
})
export class AuthModule {
  constructor(public language: LanguageCustomService) {
    language.init('/assets/i18n/auth/');
  }
}
