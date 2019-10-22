import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Email } from '../../models/Email';
import { BaseService, HttpService } from '../services';

@Injectable()
export class EmailService extends BaseService<Email> {
  constructor(protected _http: HttpService) {
    super(_http);
    this._controller = 'Email';
  }
}
