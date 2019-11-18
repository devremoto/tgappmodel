import { Injectable } from '@angular/core';
import { HttpService, BaseService } from '../services';
import { Observable } from 'rxjs';
import { HubService } from '../hub.service';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeCustomService extends BaseService<any> {

  constructor(protected _http: HttpService, public hubService: HubService) {
    super(_http, hubService);
  }

  code(code: string): Observable<any> {
    return this._http.get(`zipcode/${code}`);
  }


}
