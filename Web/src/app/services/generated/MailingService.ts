import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Mailing } from '../../models/Mailing';
import { PagingModel } from '../../models/PagingModel';
import { HubService } from '../hub.service';

@Injectable({
  providedIn: 'root',
})
export class MailingService extends BaseService<Mailing> {

  constructor(protected _http: HttpService, public hubService: HubService) {
    super(_http, hubService);
    this.controller = 'Mailing';
    this.hubService.registerCrud(this.controller);
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
