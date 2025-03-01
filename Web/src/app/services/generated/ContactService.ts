import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable, map } from 'rxjs';

import { Contact } from '../../models/Contact';

@Injectable({
    providedIn: 'root',
})
export class ContactService extends BaseService<Contact> {

    constructor(protected http: HttpService) {
        super(http);
        this._controller = 'Contact';
    }

    override getOne(entity: Contact): Observable<Contact> {
        return this.http.get(`Contact/getOne/${entity.id}`)
            .pipe(map<any, Contact>((response) => response));
    }

    remove(entity: Contact): Observable<Contact> {
        return this.removeById(`${entity.id}`)
            .pipe(map<any, Contact>((response) => response));
    }

}
