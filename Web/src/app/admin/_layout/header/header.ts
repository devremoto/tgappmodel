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
    if (!this.userData || !this.userData.picture) {
      this.userData = { picture: 'assets/admin/img/avatars/2.jpg' };
    }
  }

  logout(): void {
    this.userData = this._authService.fullLogout('admin');
  }
}
