import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable, map } from 'rxjs';

import { About } from '../../models/About';

@Injectable({
    providedIn: 'root',
})
export class AboutService extends BaseService<About> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'About';
    }

    override getOne(entity: About): Observable<About> {
        return this._http.get<About>(`About/getOne/${entity.id}`)
        .pipe(map<About, About>((response) => response));
    }

    remove(entity: About): Observable<void> {
        return this.removeById(`${entity.id}`);
    }

}
