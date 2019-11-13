import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SocialNetwork } from '../../models/SocialNetwork';
import { PagingModel } from '../../models/PagingModel';

@Injectable({
  providedIn: 'root',
})
export class SocialNetworkService extends BaseService<SocialNetwork> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'SocialNetwork';
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
