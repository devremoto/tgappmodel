import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Contact } from '../../models/Contact';
import { PagingModel } from '../../models/PagingModel';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends BaseService<Contact> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'Contact';
    }

    getOne(entity: Contact): Observable<Contact> {
        return this._http.get(`Contact/getOne/${entity.id}`)
        .map<any, Contact>((response) => response);
    }

    remove(entity: Contact): Observable<Contact> {
        return this.removeById(`${entity.id}`)
        .map<any, Contact>((response) => response);
    }

}
