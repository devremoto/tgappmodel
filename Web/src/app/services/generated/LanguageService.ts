import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable, map } from 'rxjs';

import { Language } from '../../models/Language';

@Injectable({
    providedIn: 'root',
})
export class LanguageService extends BaseService<Language> {

    constructor(protected http: HttpService) {
        super(http);
        this._controller = 'Language';
    }

    override getOne(entity: Language): Observable<Language> {
        return this.http.get(`Language/getOne/${entity.id}`)
            .pipe(map<any, Language>((response) => response));
    }

    remove(entity: Language): Observable<Language> {
        return this.removeById(`${entity.id}`)
            .pipe(map<any, Language>((response) => response));
    }

}
