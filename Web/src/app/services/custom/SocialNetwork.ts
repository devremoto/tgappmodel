import { Injectable } from '@angular/core';
import { HttpService } from '../services';
//////

import { SocialNetworkService } from '../generated/SocialNetworkService';
import { HubService } from '../hub.service';

@Injectable({
  providedIn: 'root'
})
export class SocialNetworkCustomService extends SocialNetworkService {
  constructor(protected http: HttpService, public hubService: HubService) {
    super(http, hubService);

  }
}
