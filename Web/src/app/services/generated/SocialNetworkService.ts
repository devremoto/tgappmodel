import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SocialNetwork } from '../../models/SocialNetwork';
import { PagingModel } from '../../models/PagingModel';
import { HubService } from '../hub.service';

@Injectable({
  providedIn: 'root',
})
export class SocialNetworkService extends BaseService<SocialNetwork> {

  constructor(protected _http: HttpService, public hubService: HubService) {
    super(_http, hubService);
    this.controller = 'SocialNetwork';
    this.hubService.registerCrud(this.controller);
  }

  getOne(entity: SocialNetwork): Observable<SocialNetwork> {
    return this._http.get(`SocialNetwork/getOne/${entity.id}`)
      .map<any, SocialNetwork>((response) => response);
  }

  remove(entity: SocialNetwork): Observable<SocialNetwork> {
    return this.removeById(`${entity.id}`)
      .map<any, SocialNetwork>((response) => response);
  }

}
