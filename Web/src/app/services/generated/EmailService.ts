import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Email } from '../../models/Email';
import { BaseService, HttpService } from '../services';
import { HubService } from '../hub.service';

@Injectable()
export class EmailService extends BaseService<Email> {
  constructor(protected _http: HttpService, public hubService: HubService) {
    super(_http, hubService);
    this.controller = 'Email';
    this.hubService.registerCrud(this.controller);
  }
}
