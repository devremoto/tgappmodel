import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { Config } from '../../../config';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  styles: [
    `
      .logo-url {
        background-image: url(${Config.logoUrl}) !important;
      }
    `
  ]
})
export class HeaderAdminComponent implements OnInit {
  userData: any;
  constructor(private _authService: AuthService) {
    // window.__theme = 'bs4';
  }

  ngOnInit(): void {
    this.userData = this._authService.user ? this._authService.user.profile : null;
  }

  logout(): void {
    this.userData = this._authService.fullLogout('admin');
  }
}
