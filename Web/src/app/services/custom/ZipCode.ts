import { Injectable } from '@angular/core';
import { HttpService, BaseService } from '../services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeCustomService extends BaseService<any> {

  constructor(protected http: HttpService) {
    super(http);
  }

  code(code: string): Observable<any> {
    return this.http.get(`zipcode/${code}`);
  }


}
