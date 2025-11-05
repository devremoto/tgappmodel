import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { map, Observable } from 'rxjs';

import { SocialNetwork } from '../../models/SocialNetwork';

@Injectable({
  providedIn: 'root',
})
export class SocialNetworkService extends BaseService<SocialNetwork> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'SocialNetwork';
    }

    override getOne(entity: SocialNetwork): Observable<SocialNetwork> {
        return this._http.get<SocialNetwork>(`SocialNetwork/getOne/${entity.id}`)
        .pipe(map<SocialNetwork, SocialNetwork>((response) => response));
    }

    remove(entity: SocialNetwork): Observable<void> {
        return this.removeById(`${entity.id}`);
    }

}
