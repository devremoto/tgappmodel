import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Mailing } from '../../models/Mailing';
import { PagingModel } from '../../models/PagingModel';

@Injectable({
  providedIn: 'root',
})
export class MailingService extends BaseService<Mailing> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'Mailing';
    }

    getOne(entity: Mailing): Observable<Mailing> {
        return this._http.get(`Mailing/getOne/${entity.id}`)
        .map<any, Mailing>((response) => response);
    }

    remove(entity: Mailing): Observable<Mailing> {
        return this.removeById(`${entity.id}`)
        .map<any, Mailing>((response) => response);
    }

}
