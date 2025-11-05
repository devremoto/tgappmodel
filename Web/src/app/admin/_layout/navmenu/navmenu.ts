import { Component } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { NavMenuAdminGeneratedComponent } from "./navmenuGenerated";
import { InRoleDirective } from '../../../directives/inRoleDirective';

@Component({
  selector: 'app-admin-nav-menu',
  templateUrl: './navmenu.html',
  styleUrls: ['./navmenu.css'],
  imports: [NavMenuAdminGeneratedComponent, InRoleDirective],

})
export class NavMenuAdminComponent {
  isLoggedIn: boolean;
  user: any = {};
  constructor(private _auth: AuthService) {
    this._auth.onLogin.subscribe(() => {
      this.isLoggedIn = true;
    });
    this._auth.onLogout.subscribe(() => {
      this.isLoggedIn = false;
    });
    if (this._auth.isLoggedIn()) {
      this.user = this._auth.user.profile;
    }
  }
}
