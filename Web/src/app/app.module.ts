import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { Config } from './config';
import { LanguageCustomService } from './services/custom/Language';
import { ServicesModule } from './services/services.module';
import { LibModule } from './shared/libModule.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    LibModule,
    AuthModule,
    ServicesModule,
    ComponentsModule,
    AppRoutingModule,
    NgbModule,
    TranslateModule.forRoot()
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements OnInit {
  constructor(language: LanguageCustomService, private title: Title) {
    language.init('/assets/i18n/admin/');
    language.init('/assets/i18n/admin/layout/');

    this.init();
  }

  setFavicon(icon: string) {
    let link;
    link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = icon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.title.setTitle(Config.siteTile);
    this.setFavicon(Config.favicon);
  }
}
