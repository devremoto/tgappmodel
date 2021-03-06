import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { AccountService } from '../auth/account.service';
import { Config } from '../config';

declare var $: any;

@Directive({
  selector: '[appInRole]'
})
export class InRoleDirective implements OnInit {
  userRoles = [];
  @Input('appInRole') roles: Array<string> = [];

  constructor(private el: ElementRef, private _accountService: AccountService) {
    this.setUserRoles();
  }

  ngOnInit() {
    this.checkRoles();
  }

  setUserRoles() {
    this.userRoles = [];
    const data = this._accountService.userInfo();
    if (!data) {
      return;
    }
    const role = data.role || data.roles;
    if (typeof role === 'string') {
      this.userRoles.push(this._accountService.userInfo().role.toLowerCase());
    } else {
      this.userRoles = role.map(x => x.toLowerCase());
    }
  }

  private checkRoles() {
    let i = 0;
    const el = $(this.el.nativeElement);
    if (!Config.useAuthorityServer) {
      el.detach();
      return;
    }

    if (this.userRoles) {
      this.roles.forEach((obj, index) => {
        if (this.userRoles.indexOf(this.roles[index].toLowerCase()) >= 0) {
          i++;
          return;
        }
      });
    }
    if (i === 0) {
      el.detach();
    }
  }
}
