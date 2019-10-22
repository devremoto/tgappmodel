import { Injectable } from '@angular/core';
import { HttpService, BaseService } from '../services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeCustomService extends BaseService<any> {

  constructor(protected _http: HttpService) {
    super(_http);
  }

  code(code: string): Observable<any> {
    return this._http.get(`zipcode/${code}`);
  }


}
