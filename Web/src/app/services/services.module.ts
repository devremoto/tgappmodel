import { NgModule } from '@angular/core';
import { ServiceGeneratedModule } from './generated/servicesGeneratedModule';
import { ContactCustomService } from './custom/Contact';
import { SocialNetworkCustomService } from './custom/SocialNetwork';
import { LanguageCustomService } from './custom/Language';
import { ZipCodeCustomService } from './custom/ZipCode';

@NgModule({
  imports: [
    ServiceGeneratedModule
  ],
  exports: [
    ServiceGeneratedModule
  ],
  declarations: [],
  providers: [
    ContactCustomService,
    SocialNetworkCustomService,
    ZipCodeCustomService,
    // DatePipe,
    LanguageCustomService,
  ]
})
export class ServicesModule { }
