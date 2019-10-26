import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AuthInterceptor } from '../auth/interceptor';
import { BreadcrumbsComponent } from '../directives/breadcrumb.component';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { BaseService, HttpService } from '../services/services';
import { ImgResizeComponent } from './imgResize/imgResizeComponent';
import { SessionStorageService } from './util/session-storage.service';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [ImgResizeComponent, BreadcrumbsComponent],
  providers: [HttpService, BaseService, SessionStorageService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    Ng2SmartTableModule,
    AvatarModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DirectivesModule,
    PipesModule,
    Ng2SmartTableModule,
    ImgResizeComponent,
    BreadcrumbsComponent,
    AvatarModule
  ]
})
export class SharedModule {}
