import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';

import { Mailing } from '../../models/Mailing';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MailingService extends BaseService<Mailing> {

    constructor(protected http: HttpService) {
        super(http);
        this._controller = 'Mailing';
    }

    override getOne(entity: Mailing): Observable<Mailing> {
        return this.http.get(`Mailing/getOne/${entity.id}`)
            .pipe(map<any, Mailing>((response) => response));
    }

    remove(entity: Mailing): Observable<Mailing> {
        return this.removeById(`${entity.id}`)
            .pipe(map<any, Mailing>((response) => response));
    }

}
