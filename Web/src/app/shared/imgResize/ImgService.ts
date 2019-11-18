import { Injectable } from '@angular/core';

import { BaseService, HttpService } from '../../services/services';
import { HubService } from '../../services/hub.service';

@Injectable()
export class ImgService extends BaseService<string> {
  controller: string;
  constructor(_http: HttpService,hubService :HubService) {
    super(_http, hubService
    );
    this.controller = '';
  }
}
