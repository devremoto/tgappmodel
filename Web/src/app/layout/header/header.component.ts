import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Config } from '../../config';
import { Contact } from '../../models/Contact';
import { SocialNetwork } from '../../models/SocialNetwork';
import { LanguageCustomService } from '../../services/custom/Language';
import { SocialNetworkCustomService } from '../../services/custom/SocialNetwork';

declare let $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: []
})
export class HeaderComponent implements OnInit, AfterViewInit {
  title = 'app';
  animationDelay = 2500;
  socialNetworks: SocialNetwork[];
  logo = Config.logoUrl;

  constructor(
    private _socialNetworkService: SocialNetworkCustomService,
    private _sanitizer: DomSanitizer,
    public translate: LanguageCustomService
  ) {
    translate.init();
  }

  ngOnInit() {
    const $t = this;

    this.load();
    setTimeout(() => {
      // $t.animateHeadline($('.cd-headline'))
    }, $t.animationDelay);

    this.getSocialNetworks();
  }
  safeUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }
  load() { }

  ngAfterViewInit(): void {
  }

  animateHeadline($headlines: any) {
    $headlines.each(() => {
      const headline = $(this);
      setTimeout(() => {
        this.hideWord(headline.find('.is-visible'));
      }, this.animationDelay);
    });
  }

  hideWord($word: any) {
    const nextWord = this.takeNext($word);
    this.switchWord($word, nextWord);
    setTimeout(() => {
      this.hideWord(nextWord);
    }, this.animationDelay);
  }

  takeNext($word: any) {
    return !$word.is(':last-child')
      ? $word.next()
      : $word
        .parent()
        .children()
        .eq(0);
  }

  switchWord($oldWord: any, $newWord: any) {
    $oldWord.removeClass('is-visible').addClass('is-hidden');
    $newWord.removeClass('is-hidden').addClass('is-visible');
  }

  openResume(): void { }

  private getSocialNetworks(): void {
    this._socialNetworkService.getJson().subscribe(
      result => {
        this.socialNetworks = result;
      },
      () => { }
    );
  }
}
