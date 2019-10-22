
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ComboComponent } from './combo.component';

import { ComboAboutComponent } from './combo.about';
import { ComboContactComponent } from './combo.contact';
import { ComboLanguageComponent } from './combo.language';
import { ComboMailingComponent } from './combo.mailing';
import { ComboSettingsComponent } from './combo.settings';
import { ComboSocialNetworkComponent } from './combo.socialNetwork';
import { ComboUploadFileComponent } from './combo.uploadFile';

@NgModule({
    declarations: [
        ComboComponent,
        ComboAboutComponent,
        ComboContactComponent,
        ComboLanguageComponent,
        ComboMailingComponent,
        ComboSettingsComponent,
        ComboSocialNetworkComponent,
        ComboUploadFileComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        ComboComponent,
        ComboAboutComponent,
        ComboContactComponent,
        ComboLanguageComponent,
        ComboMailingComponent,
        ComboSettingsComponent,
        ComboSocialNetworkComponent,
        ComboUploadFileComponent,
    ]


})
export class CombosModule {

}


