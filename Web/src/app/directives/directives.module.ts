import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AsideToggleDirective } from './aside.directive';
import { ClaimDirective } from './claimDirective';
import { EnterDirective } from './enter.directive';
import { InRoleDirective } from './inRoleDirective';
import { NAV_DROPDOWN_DIRECTIVES } from './nav-dropdown.directive';
import { NlbrDirective } from './nlbr.directive';
import { ProgressCircleDirective } from './progress-circle.directive';
import { ReplaceDirective } from './replaceDirective';
import { ScrollTopDirective } from './scrollTopDirective';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './sidebar.directive';
import { UploadComponent } from './upload/upload.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FormsModule, FileUploadModule, TranslateModule],
  declarations: [
    EnterDirective,
    InRoleDirective,
    ReplaceDirective,
    ClaimDirective,
    ScrollTopDirective,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES,
    ProgressCircleDirective,
    AsideToggleDirective,
    NlbrDirective,
    UploadComponent
  ],
  exports: [
    EnterDirective,
    InRoleDirective,
    ReplaceDirective,
    ClaimDirective,
    ScrollTopDirective,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES,
    ProgressCircleDirective,
    AsideToggleDirective,
    NlbrDirective,
    UploadComponent,
    FileUploadModule,
    TranslateModule
  ]
})
export class DirectivesModule {}
