import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable, map } from 'rxjs';

import { Settings } from '../../models/Settings';

@Injectable({
    providedIn: 'root',
})
export class SettingsService extends BaseService<Settings> {

    constructor(protected http: HttpService) {
        super(http);
        this._controller = 'Settings';
    }

    override getOne(entity: Settings): Observable<Settings> {
        return this.http.get(`Settings/getOne/${entity.id}`)
            .pipe(map<any, Settings>((response) => response));
    }

    remove(entity: Settings): Observable<Settings> {
        return this.removeById(`${entity.id}`)
            .pipe(map<any, Settings>((response) => response));
    }

}
