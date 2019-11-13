import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { Config } from '../../../config';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderAdminComponent implements OnInit {
  userData: any;
  style = { 'background-image': `url(${Config.logoUrl}) !important;` };
  constructor(private authService: AuthService) {
    // window.__theme = 'bs4';
  }

  ngOnInit(): void {
    this.userData = this.authService.user
      ? this.authService.user.profile
      : null;
  }

  logout(): void {
    this.userData = this.authService.fullLogout('admin');
  }
}
