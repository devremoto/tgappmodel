import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserManager, WebStorageStateStore } from 'oidc-client';

import { Config } from '../../config';
import { SessionStorageService } from '../../shared/util/session-storage.service';

@Injectable({ providedIn: 'root' })
export abstract class AuthService {
  protected _sessionStorage: any;
  protected _localStorage: any;
  protected token: string | null;
  protected id_token: string | null;
  protected callbackUrl: string;
  onLogin: EventEmitter<User> = new EventEmitter();
  onLogout: EventEmitter<string> = new EventEmitter();
  userManager: UserManager;
  protected _user: User | null = {} as User;

  constructor(protected _router: Router, protected _storage: SessionStorageService) {
    this._localStorage = this._storage.localStorage;
    this._sessionStorage = this._storage.sessionStorage;
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

    this.userManager.events.addUserLoaded((user: User) => {
      this.user = user;
    });
  }
  abstract isLoggedIn(): boolean;
  abstract getToken(): string;
  protected abstract getIdToken(): string;
  abstract redirectLogin(): void;
  abstract login(loginModel: any): void;
  protected abstract navigateTo(segment: any, params?: any): void;
  abstract navigateToUrl(url: string): void;
  abstract callBackLogin(): void;
  protected abstract logout(url?: any): void;
  abstract fullLogout(url?: any): void;
  abstract callBackLogout(): any;
  abstract callBackRenew(): any;

  public get user(): User {
    this._user = this._storage.getObjectCache<User>('user');
    return this._user!;
  }

  public set user(user: User) {
    this._storage.setObjectCache('user', user);
    this._user = user;
  }

  protected clearToken(): void {
    this._localStorage.removeItem('token');
    this._localStorage.removeItem('id_token');
    this._sessionStorage.removeItem('userData');
    this._sessionStorage.removeItem('user');
    this.id_token = null;
    this.token = null;
  }

  setCallbackUrl(url: string) {
    this.callbackUrl = url;
    this._sessionStorage.setItem('callback_url', url);
  }

  protected getCallbackUrl() {
    const url = this._sessionStorage.getItem('callback_url');
    return url || '/admin';
  }

  protected clearCallbackUrl() {
    this._sessionStorage.removeItem('callback_url');
  }

  protected setLogoutUrl(url: string) {
    this.callbackUrl = url;
    this._sessionStorage.setItem('logout_url', url);
  }

  protected getLogoutUrl() {
    const url = this._sessionStorage.getItem('logout_url');
    return url;
  }

  protected clearLogoutUrl() {
    this._sessionStorage.removeItem('logout_url');
  }
}
