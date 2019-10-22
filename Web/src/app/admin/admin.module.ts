import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { LanguageCustomService } from '../services/custom/Language';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LibModule } from '../shared/libModule.module';
import { SharedModule } from '../shared/shared.module';
import { AuthInterceptor } from '../auth/interceptor';
import { AdminLayoutModule } from './_layout/admin-layout.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LibModule,
    AdminLayoutModule,
    AdminRoutingModule,
    TranslateModule.forChild()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AdminModule {
  constructor(public language: LanguageCustomService) {
    language.init('/assets/i18n/admin/');
  }
}
