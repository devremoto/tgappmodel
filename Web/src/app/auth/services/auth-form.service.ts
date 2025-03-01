import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserManager, UserSettings } from 'oidc-client';
import { LoginModel } from 'src/app/models/LoginModel';

import { SessionStorageService } from '../../shared/util/session-storage.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthServiceForm extends AuthService implements OnInit {
  override token: string;
  override id_token: string;
  override callbackUrl: string;
  override userManager: UserManager;
  override _localStorage: Storage;
  override _sessionStorage: Storage;
  LoginModel: LoginModel;
  constructor(_router: Router, _storage: SessionStorageService) {
    super(_router, _storage);
    this.init().then(user => (this.user = user));
  }

  async ngOnInit() {
    await this.init();
  }

  async init() {
    this.user = await this.getUser().then(result => {
      this.user = result;
      return this.user;
    });

    return this.user;
  }
  isLoggedIn(): boolean {
    return this.user && !!this.user.access_token && this.user.access_token !== null; // && !this.user.expired;
  }

  getToken(): string {
    return this.user ? this.user.access_token : '';
  }

  getIdToken(): string {
    return this.user.id_token;
  }

  getUser(): Promise<User> {
    this.user = this._storage.getObjectCache<User>('user')!;
    return new Promise(resolve => {
      resolve(this.user);
    });
  }

  login() {
    this.user = new User(<UserSettings>{
      access_token: 'sdadasdasd',
      expires_at: Date.now() + 30000,
      id_token: 'adasdasd',
      profile: {},
      refresh_token: 'asdsad'
    });

    this.user.access_token = 'sdadasdasd';

    this._storage.setObjectCache('user', this.user);
    this.callBackLogin();
  }

  redirectLogin() {
    this.navigateTo('/login');
  }

  navigateTo(segment: string, params?: any) {
    if (params) {
      this._router.navigate([segment, params]);
    } else {
      this._router.navigate([segment]);
    }
  }

  navigateToUrl(url: string) {
    this._router.navigateByUrl(url);
  }

  callBackLogin() {
    this.onLogin.emit(this.user);
    const url = this.getCallbackUrl();
    this.navigateTo(url);
    return;
  }

  public logout(url?: any) {
    if (url) {
      this.setLogoutUrl(url);
    }
    this.userManager.removeUser();
    this.clearToken();
    this.onLogout.emit();
  }

  public fullLogout(url?: any) {
    this.logout(url);
    this.redirectLogin();
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
    this.userManager.signinSilentCallback().catch(error => {
      console.log(error);
    });
  }
}
