import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { Config } from '../../config';
import { Language } from '../../models/Language';
import { SessionStorageService } from '../../shared/util/session-storage.service';
import { LanguageService } from '../generated/LanguageService';
import { HttpService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class LanguageCustomService extends LanguageService {
  constructor(protected _http: HttpService, public translate: TranslateService, private _sessionStorageService: SessionStorageService) {
    super(_http);
    this._config = Config;
    this.init();
    this._time = new Date().getTime();
    translate.onLangChange.subscribe((result: LangChangeEvent) => {
      this.loadFile({ code: result.lang } as Language, this.prefix, this.sufix);
    });
  }

  languages: Array<Language> = [
    { code: 'pt-br', active: true, image: '/assets/admin/img/flags/Brazil.png' } as Language,
    { code: 'en-us', active: true, image: '/assets/admin/img/flags/United-Kingdom.png' } as Language,
    { code: 'fr-fr', active: false, image: '/assets/admin/img/flags/France.png' } as Language,
    { code: 'de-de', active: false, image: '/assets/admin/img/flags/Germany.png' } as Language,
    { code: 'cn-cn', active: false, image: '/assets/admin/img/flags/China.png' } as Language,
    { code: 'es-es', active: true, image: '/assets/admin/img/flags/Spain.png' } as Language
  ];
  language: Language;
  private _default: Language;
  get default() {
    const defaultLang = 'pt-br';
    const userLang = navigator.language ? navigator.language.toLowerCase() : defaultLang;
    this._default = this.languages.find(x => x.code === userLang);
    if (!this._default) {
      this._default = this.languages.find(x => x.code === defaultLang);
    }
    return this._default;
  }
  set default(value: Language) {
    this._default = value;
  }

  get lang(): Language {
    this._lang = this._sessionStorageService.getObjectCache<Language>('lang') || this.default;
    this._sessionStorageService.setObjectCache<Language>('lang', this._lang);
    this.translate.setDefaultLang(this.default.code);
    return this._lang;
  }
  sufix: string;
  prefix: string;
  private _time: number;
  private _config;

  private _lang: Language;

  loadAll(folder?: string) {
    const others = this.getLanguages(); // .filter(x => x.code !== this.lang);
    others.forEach(x => this.loadFile(x, folder, this.sufix));
  }

  getLanguages(): Array<Language> {
    return this.languages.filter(x => x.active);
  }

  getLanguageByCode(code: string): Language {
    this.language = this.languages.find(x => x.active && x.code === code);
    if (!this.language) {
      this.language = this.default;
    }
    return this.language;
  }

  init(folder?: string) {
    this.translate.use(this.lang.code);
    this.loadAll(folder);
    return this;
  }

  setLanguage(language: Language) {
    const lang = this.getLanguageByCode(language.code) || this.default;
    this._sessionStorageService.setObjectCache<Language>('lang', lang);
    this.translate.use(lang.code);
  }

  getAssets(folder: string): any {
    return this._http.get(`${this._config.siteUrl}/file/assets/`, { folder });
  }

  getTranslationFile(file: any): any {
    return this._http.get(`${this._config.siteUrl}/assets/i18n/${file}?${new Date().getTime()}`);
  }

  getDefaultLanguage() {
    return this.get<Language>('default');
  }

  saveAsset(list: any[]): any {
    return this._http.post(`${this._config.siteUrl}/file/saveasset`, list);
  }

  translation(text, from, to) {
    return this.get<any>(`translation/${encodeURIComponent(text)}/${encodeURIComponent(from)}/${encodeURIComponent(to)}`).map<any, string>(
      result => result.text || ''
    );
  }

  loadFile(language: Language, prefix = '/assets/i18n/pages/', sufix = '.json') {
    prefix = prefix || '/assets/i18n/pages/';
    sufix = sufix || '.json';
    this.sufix = sufix;
    this.prefix = prefix;
    const key = `${prefix}${language.code}${sufix}`;
    const obj = this._sessionStorageService.getObjectCache<Object>(key);
    if (!obj && !language.loaded) {
      this._http.get(`${this._config.siteUrl}${key}?${this._time}`, null, false).subscribe(result => {
        this._sessionStorageService.setObjectCache<Object>(key, result);
        this.translate.setTranslation(language.code, result, true);
        language.loaded = true;
      });
    } else {
      this.translate.setTranslation(language.code, obj, true);
    }
  }
}
