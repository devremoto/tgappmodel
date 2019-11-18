import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Language } from '../../models/Language';
import { PagingModel } from '../../models/PagingModel';
import { HubService } from '../hub.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends BaseService<Language> {

  constructor(protected _http: HttpService, public hubService: HubService) {
    super(_http, hubService);
    this.controller = 'Language';
    this.hubService.registerCrud(this.controller);
  }

  getOne(entity: Language): Observable<Language> {
    return this._http.get(`Language/getOne/${entity.id}`)
      .map<any, Language>((response) => response);
  }

  remove(entity: Language): Observable<Language> {
    return this.removeById(`${entity.id}`)
      .map<any, Language>((response) => response);
  }

}
