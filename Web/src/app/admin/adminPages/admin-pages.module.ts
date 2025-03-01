import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutModule } from '../../layout/layout.module';
import { LanguageCustomService } from '../../services/custom/Language';
import { LibModule } from '../../shared/libModule.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LanguageEditorFormComponent } from './language-editor/language-editor-form.component';
import { LanguageEditorComponent } from './language-editor/language-editor.component';
import { LanguageSettingsComponent } from './language-settings/language-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

@NgModule({
  imports: [CommonModule, SharedModule, LibModule, LayoutModule, AdminPagesRoutingModule, TranslateModule.forChild()],
  declarations: [
    ProfileComponent,
    SettingsComponent,
    LanguageEditorComponent,
    LanguageEditorFormComponent,
    UserSettingsComponent,
    AppSettingsComponent,
    DashboardComponent,
    LanguageSettingsComponent,
  ]
})
export class AdminPagesModule {
  constructor(private language: LanguageCustomService) {
    // language.init('/assets/i18n/admin/');
  }
}
