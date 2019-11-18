import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Contact } from '../../models/Contact';
import { PagingModel } from '../../models/PagingModel';
import { HubService } from '../hub.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends BaseService<Contact> {

  constructor(protected _http: HttpService, public hubService: HubService) {
    super(_http, hubService);
    this.controller = 'Contact';
    this.hubService.registerCrud(this.controller);
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
