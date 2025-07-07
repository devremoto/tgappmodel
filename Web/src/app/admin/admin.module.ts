import { NgModule } from '@angular/core';
import { LanguageCustomService } from '../services/custom/Language';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/interceptor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
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
