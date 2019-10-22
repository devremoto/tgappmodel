import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private _auth: AuthService) {

  }

  userInfo(): any {
    return this._auth.user ? this._auth.user.profile : { role: {}, roles: [] };
  }

  logout(returnUrl) {
    this._auth.fullLogout(returnUrl);
  }
}
