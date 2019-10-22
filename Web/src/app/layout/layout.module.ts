import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ComponentsModule } from '../components/components.module';
import { LanguageCustomService } from '../services/custom/Language';
import { LibModule } from '../shared/libModule.module';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    RouterModule,
    LibModule,
    TranslateModule.forChild({
      isolate: true
    })
  ],
  declarations: [IndexComponent, FooterComponent, HeaderComponent],
  exports: [IndexComponent, FooterComponent, HeaderComponent]
})
export class LayoutModule {
  constructor(translate: TranslateService, language: LanguageCustomService) {
    translate.use(translate.currentLang);
    language.init('/assets/i18n/layout/');
  }
}
