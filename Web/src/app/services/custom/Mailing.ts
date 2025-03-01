import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Mailing } from '../../models/Mailing';
import { MailingService } from '../generated/MailingService';
import { HttpService } from '../services';

//////

@Injectable({
  providedIn: 'root'
})
export class MailingCustomService extends MailingService {
  constructor(override http: HttpService) {
    super(http);
  }

  sendEmail(mailing: Mailing): Observable<any> {
    return this.http.post(this._controller + '/sendEmail/', mailing);
  }

  signUp(mailing: Mailing): Observable<any> {
    return this.http.post(this._controller + '/signUp/', mailing);
  }
}
