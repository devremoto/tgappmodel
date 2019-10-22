import { Component, Input, OnInit } from '@angular/core';
import { Language } from 'src/app/models/Language';
import { LanguageCustomService } from 'src/app/services/custom/Language';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {
  public status: { isopen: boolean } = { isopen: false };
  @Input()
  cssClass = 'primary';
  language: Language = <Language>{};
  languages: Array<Language> = [];
  constructor(public translate: LanguageCustomService) {}

  ngOnInit() {
    this.languages = this.translate.getLanguages();
    this.language = this.languages.find(x => x.code === this.translate.translate.currentLang || x.code === this.translate.lang.code);
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
