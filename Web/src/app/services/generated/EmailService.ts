import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Email } from '../../models/Email';
import { BaseService, HttpService } from '../services';

@Injectable()
export class EmailService extends BaseService<Email> {
  constructor(protected http: HttpService) {
    super(http);
    this._controller = 'Email';
  }
}
