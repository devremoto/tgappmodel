import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable, map } from 'rxjs';

import { About } from '../../models/About';

@Injectable({
    providedIn: 'root',
})
export class AboutService extends BaseService<About> {

    constructor(protected http: HttpService) {
        super(http);
        this._controller = 'About';
    }

    override getOne(entity: About): Observable<About> {
        return this.http.get(`About/getOne/${entity.id}`)
            .pipe(map<any, About>((response) => response));
    }

    remove(entity: About): Observable<About> {
        return this.removeById(`${entity.id}`)
            .pipe(map<any, About>((response) => response));
    }

}
