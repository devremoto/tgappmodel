import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Mailing } from '../../models/Mailing';
import { MailingService } from '../generated/MailingService';
import { HttpService } from '../services';

//////

@Injectable({
  providedIn: 'root'
})
export class MailingCustomService extends MailingService {
  constructor(protected _http: HttpService) {
    super(_http);
  }

  sendEmail(mailing: Mailing): Observable<any> {
    return this._http.post(this._controller + '/sendEmail/', mailing);
  }

  signUp(mailing: Mailing): Observable<any> {
    return this._http.post(this._controller + '/signUp/', mailing);
  }
}
