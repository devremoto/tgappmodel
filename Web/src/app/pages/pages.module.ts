import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageCustomService } from '../services/custom/Language';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact';
import { LibModule } from '../shared/libModule.module';
import { ToasterService } from 'angular2-toaster/src/toaster.service';

@NgModule({
  declarations: [AboutComponent, ContactComponent, HomeComponent],
  imports: [
    SharedModule,
    LibModule,
    PagesRoutingModule,
    LayoutModule,
    TranslateModule.forChild({
      // isolate: true
    })
  ],
  exports: [AboutComponent, ContactComponent, HomeComponent],
  providers: [ToasterService]
})
export class PagesModule {
  lang: string;
  constructor(public language: LanguageCustomService) {
    language.init('/assets/i18n/pages/');
  }
}
