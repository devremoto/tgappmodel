import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { EmailService } from '../generated/EmailService';
import { HttpService } from '../services';

//////

@Injectable({
  providedIn: 'root'
})
export class EmailCustomService extends EmailService {
  constructor(override http: HttpService) {
    super(http);
  }
}
