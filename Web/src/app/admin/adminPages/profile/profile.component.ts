import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../auth/account.service';
import { Profile, ProfileStandardClaims } from 'oidc-client';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],

})
export class ProfileComponent implements OnInit {
    userInfo: Profile;
    user: ProfileStandardClaims

    constructor(private _accountService: AccountService) { }

    async ngOnInit() {
        this.user = this._accountService.userInfo();
        this.userInfo = await this._accountService.userInfo();
    }

}
