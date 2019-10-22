import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Config } from '../config';
import { AuthService } from './services/auth.service';
@Injectable({ providedIn: 'root' })
export class AuthCanActivateGuard implements CanActivate {
  private config;
  constructor(private authService: AuthService, private _router: Router) {
    this.config = Config;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = state.url;
    const logged = this.authService.isLoggedIn();
    if (!logged) {
      if (url) {
        this.authService.setCallbackUrl(url);
      }
      this.authService.redirectLogin();
      return;
    }
    return logged;
  }
}
