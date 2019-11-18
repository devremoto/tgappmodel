import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Settings } from '../../models/Settings';
import { PagingModel } from '../../models/PagingModel';
import { HubService } from '../hub.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends BaseService<Settings> {

  constructor(protected _http: HttpService, public hubService: HubService) {
    super(_http, hubService);
    this.controller = 'Settings';
    this.hubService.registerCrud(this.controller);
  }

  getOne(entity: Settings): Observable<Settings> {
    return this._http.get(`Settings/getOne/${entity.id}`)
      .map<any, Settings>((response) => response);
  }

  remove(entity: Settings): Observable<Settings> {
    return this.removeById(`${entity.id}`)
      .map<any, Settings>((response) => response);
  }

}
