import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from 'oidc-client';

@Component({
  templateUrl: './callback.html'
})
export class LogoutCallBackComponent implements OnInit {
  user: User;
  message: string;

  constructor(private _auth: AuthService) {
    this._auth.userManager.getUser().then(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this._auth.callBackLogout();
    this.message = 'Logging out';
    return;
  }
}
