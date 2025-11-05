import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { map, Observable } from 'rxjs';

import { Mailing } from '../../models/Mailing';

@Injectable({
  providedIn: 'root',
})
export class MailingService extends BaseService<Mailing> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'Mailing';
    }

    override getOne(entity: Mailing): Observable<Mailing> {
        return this._http.get<Mailing>(`Mailing/getOne/${entity.id}`)
        .pipe(map<Mailing, Mailing>((response) => response));
    }

    remove(entity: Mailing): Observable<void> {
        return this.removeById(`${entity.id}`);
    }

}
