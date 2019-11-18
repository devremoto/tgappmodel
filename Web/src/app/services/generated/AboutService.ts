import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { About } from '../../models/About';
import { PagingModel } from '../../models/PagingModel';
import { HubService } from '../hub.service';

@Injectable({
  providedIn: 'root',
})
export class AboutService extends BaseService<About> {

  constructor(protected _http: HttpService, public hubService: HubService) {
    super(_http, hubService);
    this.controller = 'About';
    this.hubService.registerCrud(this.controller);
  }

  getOne(entity: About): Observable<About> {
    return this._http.get(`About/getOne/${entity.id}`)
      .map<any, About>((response) => response);
  }

  remove(entity: About): Observable<About> {
    return this.removeById(`${entity.id}`)
      .map<any, About>((response) => response);
  }

}
