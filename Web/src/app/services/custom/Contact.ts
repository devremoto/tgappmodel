import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../../models/Contact';
import { ContactService } from '../generated/ContactService';
import { HttpService } from '../services';
import { ZipCodeCustomService } from './ZipCode';
import { HubService } from '../hub.service';

@Injectable({
  providedIn: 'root'
})
export class ContactCustomService extends ContactService {

  constructor(protected _http: HttpService, public zipCode: ZipCodeCustomService, public hubService: HubService) {
    super(_http, hubService);
    // zipCode.code('06213040').subscribe(result => console.log(result));
  }

  sendEmail(contact: Contact): Observable<any> {
    return this._http.post(this.controller + '/sendEmail/', contact);
    // .map((response: Response) => <Contact[]>response.json());
  }
}
