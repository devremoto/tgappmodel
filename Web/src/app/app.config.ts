import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './auth/services/auth.service';
import { AuthServiceFactory } from './auth/services/auth-service-factory';
import { SessionStorageService } from './shared/util/session-storage.service';
import { AuthInterceptor, authInterceptorFunction } from './auth/interceptor';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader =
  (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptorFunction]),),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideToastr(),
    provideAnimations(),
    { provide: AuthService, useFactory: AuthServiceFactory.resolver, deps: [Router, SessionStorageService] },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ]
  // Add this line to provide HttpClient
};
