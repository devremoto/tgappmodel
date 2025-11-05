import { Config } from '../../config';
import { AuthServiceOidc } from './auth-oidc.service';
import { AuthServiceForm } from './auth-form.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../shared/util/session-storage.service';

export class AuthServiceFactory {
  static factory() {
    return Config.useAuthorityServer || <any>Config.useAuthorityServer === 'true' ? AuthServiceOidc : AuthServiceForm;
  }

  static resolver(_router: Router, _storage: SessionStorageService) {
    if (Config.useAuthorityServer) {
      console.log('Using OIDC Auth Service');
      return new AuthServiceOidc(_router, _storage);
    } else {
      console.log('Using Form Auth Service');
      return new AuthServiceForm(_router, _storage);
    }
  }
}
