import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { map, Observable } from 'rxjs';

import { Settings } from '../../models/Settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends BaseService<Settings> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'Settings';
    }

    override getOne(entity: Settings): Observable<Settings> {
        return this._http.get<Settings>(`Settings/getOne/${entity.id}`)
        .pipe(map<Settings, Settings>((response) => response));
    }

    remove(entity: Settings): Observable<void> {
        return this.removeById(`${entity.id}`);
    }

}
