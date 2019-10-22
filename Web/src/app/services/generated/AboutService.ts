import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { About } from '../../models/About';

@Injectable({
  providedIn: 'root',
})
export class AboutService extends BaseService<About> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'About';
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
