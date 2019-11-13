import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Config } from '../../config';
import { SocialNetwork } from '../../models/SocialNetwork';
import { LanguageCustomService } from '../../services/custom/Language';
import { SocialNetworkCustomService } from '../../services/custom/SocialNetwork';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: []
})
export class HeaderComponent implements OnInit {
  title = 'app';
  animationDelay = 2500;
  socialNetworks: SocialNetwork[];
  logo = Config.logoUrl;

  constructor(private _socialNetworkService: SocialNetworkCustomService, private _sanitizer: DomSanitizer, public translate: LanguageCustomService) {
    translate.init();
  }

  ngOnInit() {
    const $t = this;

    this.getSocialNetworks();
  }
  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }

  private getSocialNetworks(): void {
    this._socialNetworkService.getJson().subscribe(
      result => {
        this.socialNetworks = result;
      },
      () => {}
    );
  }
}
