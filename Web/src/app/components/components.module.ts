import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PageTitleComponent } from './page-title/page-title.component';
import { LibModule } from '../shared/libModule.module';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog/dialog.service';
import { DirectivesModule } from '../directives/directives.module';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';

@NgModule({
  imports: [SharedModule, LibModule, DirectivesModule],
  declarations: [PageTitleComponent, DialogComponent, LanguageSelectorComponent],
  exports: [LanguageSelectorComponent, PageTitleComponent],
  providers: [DialogService],
  entryComponents: [DialogComponent]
})
export class ComponentsModule {}
