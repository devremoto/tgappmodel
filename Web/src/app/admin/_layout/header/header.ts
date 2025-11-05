import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { Profile, ProfileStandardClaims, User } from 'oidc-client';
import { RouterModule } from '@angular/router';
import { LanguageSelectorComponent } from "../../../components/language-selector/language-selector.component";
import { UserData } from '../../../models/About';
import { TranslateModule } from '@ngx-translate/core';
import { Config } from '../../../config'
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AsideToggleDirective } from '../../../directives/aside.directive';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarToggleDirective } from '../../../directives/sidebar.directive';
@Component({
  selector: 'app-admin-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [RouterModule,
    LanguageSelectorComponent,
    TranslateModule,
    CommonModule,
    AsideToggleDirective,
    SidebarToggleDirective,
    NgbDropdownModule
  ],

})
export class HeaderAdminComponent implements OnInit {

  userData: UserData | Profile | ProfileStandardClaims | any;
  logUrl: any;

  constructor(private _authService: AuthService, private _sanitizer: DomSanitizer) {
    // window.__theme = 'bs4';
    this.logUrl = `url(${Config.logoUrl})`;
  }

  ngOnInit(): void {
    this.userData = this._authService.user ? this._authService.user.profile : null;
    if (!this.userData || !this.userData.picture) {
      this.userData = { picture: 'assets/admin/img/avatars/2.jpg' };
    }
  }

  safeUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }
  logout(): void {
    this.userData = this._authService.fullLogout('admin');
  }
}
