import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { Profile, ProfileStandardClaims, User } from 'oidc-client';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],

})
export class HeaderAdminComponent implements OnInit {
  userData: User | Profile | ProfileStandardClaims | null | void;
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
