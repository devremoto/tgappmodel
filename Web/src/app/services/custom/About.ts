import { Injectable } from '@angular/core';
import { HttpService } from '../services';
import { AboutService } from '../generated/AboutService';
import { HubService } from '../hub.service';

@Injectable({
  providedIn: 'root',
})
export class AboutCustomService extends AboutService {

  constructor(protected _http: HttpService, public hubService: HubService) {
    super(_http, hubService);
    this.hubService.registerCrud(this.controller);
  }
}
