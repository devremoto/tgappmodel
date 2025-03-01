import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PageTitleComponent } from './page-title/page-title.component';
import { LibModule } from '../shared/libModule.module';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog/dialog.service';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { BreadcrumbsComponent } from '../directives/breadcrumb.component';

@NgModule({
  imports: [
    SharedModule,
    LibModule,
  ],
  declarations: [
    PageTitleComponent,
    DialogComponent,
    LanguageSelectorComponent,
  ],
  exports: [
    LanguageSelectorComponent,
    PageTitleComponent,
  ],
  providers: [DialogService],
  entryComponents: [DialogComponent],
})
export class ComponentsModule { }
