import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthInterceptor } from '../auth/interceptor';
import { BreadcrumbsComponent } from '../directives/breadcrumb.component';
import { PipesModule } from '../pipes/pipes.module';
import { BaseService, HttpService } from '../services/services';
import { ImgResizeComponent } from './imgResize/imgResizeComponent';
import { SessionStorageService } from './util/session-storage.service';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [ImgResizeComponent],
  providers: [HttpService, BaseService, SessionStorageService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    PipesModule,
    ImgResizeComponent,
    DirectivesModule

  ]
})
export class SharedModule { }
