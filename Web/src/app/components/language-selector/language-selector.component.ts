import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Language } from '../../models/Language';
import { LanguageCustomService } from '../../services/custom/Language';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],

  imports: [TranslateModule, CommonModule, RouterModule, NgbDropdownModule]
})
export class LanguageSelectorComponent implements OnInit {
  public status: { isopen: boolean } = { isopen: false };
  @Input()
  cssClass = 'primary';
  language: Language = <Language>{};
  languages: Array<Language> = [];
  constructor(public translate: LanguageCustomService) { }

  ngOnInit() {
    this.languages = this.translate.getLanguages();
    this.language = this.languages.filter(x => x.code === this.translate.lang.code)[0];
  }
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  changeLanguage(language: Language) {
    this.translate.setLanguage(language);
    this.language = language;
  }
}
