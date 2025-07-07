import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LanguageCustomService } from '../services/custom/Language';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild({
      isolate: true
    })
  ],
})
export class LayoutModule {
  constructor(translate: TranslateService, language: LanguageCustomService) {
    translate.use(translate.currentLang);
    language.init('/assets/i18n/layout/');
  }
}
