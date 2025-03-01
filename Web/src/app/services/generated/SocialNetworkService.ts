import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable, map } from 'rxjs';

import { SocialNetwork } from '../../models/SocialNetwork';

@Injectable({
    providedIn: 'root',
})
export class SocialNetworkService extends BaseService<SocialNetwork> {

    constructor(protected http: HttpService) {
        super(http);
        this._controller = 'SocialNetwork';
    }

    override getOne(entity: SocialNetwork): Observable<SocialNetwork> {
        return this.http.get(`SocialNetwork/getOne/${entity.id}`).
            pipe(
                map<any, SocialNetwork>((response) => response)
            )
    }

    remove(entity: SocialNetwork): Observable<SocialNetwork> {
        return this.removeById(`${entity.id}`).
            pipe(
                map<any, SocialNetwork>((response) => response)
            )
    }

}
