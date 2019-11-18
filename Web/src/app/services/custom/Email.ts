import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { EmailService } from '../generated/EmailService';
import { HttpService } from '../services';
import { HubService } from '../hub.service';

//////

@Injectable({
  providedIn: 'root'
})
export class EmailCustomService extends EmailService {
  constructor(protected _http: HttpService, public hubService: HubService) {
    super(_http, hubService);
  }
}
