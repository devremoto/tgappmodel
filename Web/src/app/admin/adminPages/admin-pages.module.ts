import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutModule } from '../../layout/layout.module';
import { LanguageCustomService } from '../../services/custom/Language';
import { AdminPagesRoutingModule } from './admin-pages-routing.module';

@NgModule({
  imports: [CommonModule, LayoutModule, AdminPagesRoutingModule, TranslateModule.forChild()],

})
export class AdminPagesModule {
  constructor(private language: LanguageCustomService) {
    // language.init('/assets/i18n/admin/');
  }
}
