// models imports/////////////////////////////////
import { NgModule } from '@angular/core';

import { AboutService } from './AboutService';
import { ContactService } from './ContactService';
import { LanguageService } from './LanguageService';
import { MailingService } from './MailingService';
import { SettingsService } from './SettingsService';
import { SocialNetworkService } from './SocialNetworkService';
import { UploadFileService } from './UploadFileService';

@NgModule({
  // provides
  providers: [
    AboutService,
    ContactService,
    LanguageService,
    MailingService,
    SettingsService,
    SocialNetworkService,
    UploadFileService,
  ]
})
export class ServiceGeneratedModule {

}
