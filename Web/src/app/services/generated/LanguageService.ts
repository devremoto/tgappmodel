import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { map, Observable } from 'rxjs';

import { Language } from '../../models/Language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends BaseService<Language> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'Language';
    }

    override getOne(entity: Language): Observable<Language> {
        return this._http.get<Language>(`Language/getOne/${entity.id}`)
        .pipe(map<Language, Language>((response) => response));
    }

    remove(entity: Language): Observable<void> {
        return this.removeById(`${entity.id}`);
    }

}
