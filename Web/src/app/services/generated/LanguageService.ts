import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Language } from '../../models/Language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends BaseService<Language> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'Language';
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
