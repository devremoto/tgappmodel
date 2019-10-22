import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../shared/util/session-storage.service';
import { UserManager, User } from 'oidc-client';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthServiceOidc extends AuthService {
  token: string;
  id_token: string;
  callbackUrl: string;
  onLogin: EventEmitter<User> = new EventEmitter();
  onLogout: EventEmitter<string> = new EventEmitter();
  userManager: UserManager;
  _localStorage: Storage;

  constructor(_router: Router, _storage: SessionStorageService) {
    super(_router, _storage);
  }



  isLoggedIn(): boolean {

    return this.user && this.user.access_token && !this.user.expired;
  }

  getToken(): string {
    return this.user.access_token;
  }

  getIdToken(): string {
    return this.user.id_token;
  }

  login() {
    this.userManager.removeUser().then(
      result => { console.log(result); }
    );
    this.redirectLogin();
  }

  public redirectLogin() {
    this.userManager.signinRedirect();
  }

  navigateTo(segment, params?: any) {
    this._router.navigate([segment, params]);
  }

  navigateToUrl(url) {
    this._router.navigateByUrl(url);
  }

  callBackLogin() {
    this.userManager.signinRedirectCallback().then(
      user => {
        this.user = user;

        this.onLogin.emit(user);
        const url = this.getCallbackUrl();
        this._router.navigate([url]);
      },
      () => { }
    );
    return;
  }

  public logout(url?: any) {
    if (url) {
      this.setLogoutUrl(url);
    }
    this.clearToken();
  }

  public fullLogout(url?: any) {
    this.logout(url);
    this.userManager.signoutRedirect();
  }

  callBackLogout(): any {
    this.userManager.signoutRedirectCallback().then(() => {
      const url = this.getLogoutUrl() || 'home';
      this.onLogout.emit(url);
      this._router.navigate([url]);
      this.clearLogoutUrl();
    });
  }

  callBackRenew(): any {
    this.userManager.signinSilentCallback()
      .then(
        result => console.log(result),
        error => console.log(error))
      .catch(error => {
        console.log(error);
      });
  }

}
