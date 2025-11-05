// models imports/////////////////////////////////
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthCanActivateGuard } from '../auth/auth-can-activate.guard';
import { LanguageCustomService } from '../services/custom/Language';

import { AboutEditComponent } from './_generated/About/AboutEdit.component';
import { AboutIndexComponent } from './_generated/About/AboutIndex.component';
import { ContactEditComponent } from './_generated/Contact/ContactEdit.component';
import { ContactIndexComponent } from './_generated/Contact/ContactIndex.component';
import { LanguageEditComponent } from './_generated/Language/LanguageEdit.component';
import { LanguageIndexComponent } from './_generated/Language/LanguageIndex.component';
import { MailingEditComponent } from './_generated/Mailing/MailingEdit.component';
import { MailingIndexComponent } from './_generated/Mailing/MailingIndex.component';
import { SettingsEditComponent } from './_generated/Settings/SettingsEdit.component';
import { SettingsIndexComponent } from './_generated/Settings/SettingsIndex.component';
import { SocialNetworkEditComponent } from './_generated/SocialNetwork/SocialNetworkEdit.component';
import { SocialNetworkIndexComponent } from './_generated/SocialNetwork/SocialNetworkIndex.component';
import { UploadFileEditComponent } from './_generated/UploadFile/UploadFileEdit.component';
import { UploadFileIndexComponent } from './_generated/UploadFile/UploadFileIndex.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'about',
        data: { title: 'ABOUT.TITLE' },
        component: AboutIndexComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'about/:id?',
        data: { title: 'ABOUT.TITLE' },
        component: AboutEditComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'contact',
        data: { title: 'CONTACT.TITLE' },
        component: ContactIndexComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'contact/:id?',
        data: { title: 'CONTACT.TITLE' },
        component: ContactEditComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'language',
        data: { title: 'LANGUAGE.TITLE' },
        component: LanguageIndexComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'language/:id?',
        data: { title: 'LANGUAGE.TITLE' },
        component: LanguageEditComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'mailing',
        data: { title: 'MAILING.TITLE' },
        component: MailingIndexComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'mailing/:id?',
        data: { title: 'MAILING.TITLE' },
        component: MailingEditComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'settings',
        data: { title: 'SETTINGS.TITLE' },
        component: SettingsIndexComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'settings/:id?',
        data: { title: 'SETTINGS.TITLE' },
        component: SettingsEditComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'socialNetwork',
        data: { title: 'SOCIAL_NETWORK.TITLE' },
        component: SocialNetworkIndexComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'socialNetwork/:id?',
        data: { title: 'SOCIAL_NETWORK.TITLE' },
        component: SocialNetworkEditComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'uploadFile',
        data: { title: 'UPLOAD_FILE.TITLE' },
        component: UploadFileIndexComponent,
        canActivate: [AuthCanActivateGuard]
      },
      {
        path: 'uploadFile/:id?',
        data: { title: 'UPLOAD_FILE.TITLE' },
        component: UploadFileEditComponent,
        canActivate: [AuthCanActivateGuard]
      },
    ])
  ],
  // //   entryComponents: [
  // //       AboutModalComponent,
  // //       ContactModalComponent,
  // //       LanguageModalComponent,
  // //       MailingModalComponent,
  // //       SettingsModalComponent,
  // //       SocialNetworkModalComponent,
  // //       UploadFileModalComponent,
  // // ]
})
export class GeneratedAdminModule {
  constructor(private _languageService: LanguageCustomService) {
  }

  translate(key: string) {
    return this._languageService.translate.instant(key);
  }
}
