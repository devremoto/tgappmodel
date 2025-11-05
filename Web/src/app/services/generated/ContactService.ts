import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { map, Observable } from 'rxjs';

import { Contact } from '../../models/Contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends BaseService<Contact> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'Contact';
    }

    override getOne(entity: Contact): Observable<Contact> {
        return this._http.get<Contact>(`Contact/getOne/${entity.id}`)
        .pipe(map<Contact, Contact>((response) => response));
    }

    remove(entity: Contact): Observable<void> {
        return this.removeById(`${entity.id}`);
    }

}
