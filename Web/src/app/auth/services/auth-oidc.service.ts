import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../shared/util/session-storage.service';
import { UserManager, User, WebStorageStateStore } from 'oidc-client';
import { AuthService } from './auth.service';
import { Config } from '../../config';

@Injectable({ providedIn: 'root' })
export class AuthServiceOidc extends AuthService {
  declare token: string;
  declare id_token: string;
  declare callbackUrl: string;
  override onLogin: EventEmitter<User> = new EventEmitter();
  override onLogout: EventEmitter<string> = new EventEmitter();
  declare userManager: UserManager;
  declare _localStorage: Storage;

  constructor(_router: Router, _storage: SessionStorageService) {
    super(_router, _storage);
    this.userManager = new UserManager({
      authority: Config.authorityAddress,
      client_id: Config.client_id,
      redirect_uri: Config.redirect_url,
      scope: Config.scope,
      response_type: Config.response_type,
      post_logout_redirect_uri: Config.post_logout_redirect_uri,
      userStore: new WebStorageStateStore({ store: this._localStorage }),
      automaticSilentRenew: Config.allowSilentRenew,
      silent_redirect_uri: Config.silent_redirect_uri
    });
  }



  isLoggedIn(): boolean {

    return this.user && !!this.user.access_token && !this.user.expired;
  }

  getToken(): string {
    return this.user.access_token;
  }

  getIdToken(): string {
    return this.user.id_token;
  }

  login() {
    this.userManager.removeUser().then(
      result => { console.log(result) }
    )
    this.redirectLogin();
  }

  public redirectLogin() {
    //this.callBackLogin();
    //this.userManager.signinRedirectCallback();
    if (Config.useAuthorityServer) {
      this.userManager.signinRedirect();
    } else {
      this._router.navigate(['/login']);
    }

  }

  navigateTo(segment: string, params?: any) {
    this._router.navigate([segment, params]);
  }

  navigateToUrl(url: string) {
    this._router.navigateByUrl(url);
  }

  callBackLogin() {
    this.userManager.signinRedirectCallback()
      .then(
        user => {
          this.user = user;

          this.onLogin.emit(user);
          const url = this.getCallbackUrl();
          this._router.navigate([url]);
        },
        (error) => {
          console.error('Error during login callback:', error);
        }
      ).catch((error) => {
        console.error('Error during login callback:', error);
      });
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
