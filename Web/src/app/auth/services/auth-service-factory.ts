import { Config } from '../../config';
import { AuthServiceOidc } from './auth-oidc.service';
import { AuthServiceForm } from './auth-form.service';
import { SessionStorageService } from 'src/app/shared/util/session-storage.service';
import { Router } from '@angular/router';

export class AuthServiceFactory {
  static factory() {
    return Config.useAuthorityServer || <any>Config.useAuthorityServer === 'true' ? AuthServiceOidc : AuthServiceForm;
  }

  static resolver(_router: Router, _storage: SessionStorageService) {
    if (Config.useAuthorityServer) {
      return new AuthServiceOidc(_router, _storage);
    } else {
      return new AuthServiceForm(_router, _storage);
    }
  }
}
