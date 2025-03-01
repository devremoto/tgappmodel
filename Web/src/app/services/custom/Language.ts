import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { Config } from '../../config';
import { Language } from '../../models/Language';
import { SessionStorageService } from '../../shared/util/session-storage.service';
import { LanguageService } from '../generated/LanguageService';
import { HttpService } from '../services';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageCustomService extends LanguageService {
  constructor(
    override http: HttpService,
    public translate: TranslateService,
    private _sessionStorageService: SessionStorageService
  ) {
    super(http);
    (this._config = Config), this.init();
    this._time = new Date().getTime();
    translate.onLangChange.subscribe((result: LangChangeEvent) => {
      this.loadFile(<Language>{ code: result.lang }, this.prefix, this.sufix);
    });
  }


  languages: Array<Language> = [
    <Language>{ code: 'pt-br', active: true, image: '/assets/admin/img/flags/Brazil.png' },
    <Language>{ code: 'en-us', active: true, image: '/assets/admin/img/flags/United-Kingdom.png' },
    <Language>{ code: 'fr-fr', active: false, image: '/assets/admin/img/flags/France.png' },
    <Language>{ code: 'de-de', active: false, image: '/assets/admin/img/flags/Germany.png' },
    <Language>{ code: 'cn-cn', active: false, image: '/assets/admin/img/flags/China.png' },
    <Language>{ code: 'es-es', active: true, image: '/assets/admin/img/flags/Spain.png' }
  ];
  language: Language;
  private _default: Language;
  get default() {
    this._default = this.languages.filter(x => x.code === 'pt-br')[0];
    return this._default;
  }
  set default(value: Language) {
    this._default = value;
  }

  get lang(): Language {
    this._lang =
      this._sessionStorageService.getObjectCache<Language>('lang') ||
      this.default;
    this._sessionStorageService.setObjectCache<Language>('lang', this._lang);
    this.translate.setDefaultLang(this.default!.code!);
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

  init(folder?: string) {
    this.translate.use(this.lang!.code!);
    this.loadAll(folder);
    return this;
  }

  setLanguage(language: Language) {
    this._sessionStorageService.setObjectCache<Language>('lang', language);
    this.translate.use(language!.code!);
  }

  getAssets(folder: string): any {
    return this.http.get(`${this._config.siteUrl}/file/assets/`, { folder });
  }

  getTranslationFile(file: any): any {
    return this.http.get(
      `${this._config.siteUrl}/assets/i18n/${file}?${new Date().getTime()}`
    );
  }

  getDefaultLanguage() {
    return this.get<Language>('default');
  }

  saveAsset(list: any[]): any {
    return this.http.post(`${this._config.siteUrl}/file/saveasset`, list);
  }

  translation(text: string, from: string, to: string) {
    return this.get<any>(
      `translation/${encodeURIComponent(text)}/${encodeURIComponent(
        from
      )}/${encodeURIComponent(to)}`
    ).pipe(map<any, string>((result: any) => result.text || ''));
  }

  loadFile(language: Language, prefix = '/assets/i18n/', sufix = '.json') {
    prefix = prefix || '/assets/i18n/';
    sufix = sufix || '.json';
    this.sufix = sufix;
    this.prefix = prefix;
    const key = `${prefix}${language.code}${sufix}`;
    const obj = this._sessionStorageService.getObjectCache<Object>(key);
    if (!obj && !language.loaded) {
      this.http
        .get(`${this._config.siteUrl}${key}?${this._time}`, null, false)
        .subscribe(result => {
          this._sessionStorageService.setObjectCache<Object>(key, result!);
          this.translate.setTranslation(language.code!, result!, true);
          language.loaded = true;
        });
    } else {
      this.translate.setTranslation(language.code!, obj!, true);
    }
  }
}
