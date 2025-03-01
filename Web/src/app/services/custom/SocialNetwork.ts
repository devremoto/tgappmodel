import { Injectable } from '@angular/core';
import { HttpService } from '../services';
//////

import { SocialNetworkService } from '../generated/SocialNetworkService';

@Injectable({
  providedIn: 'root',
})
export class SocialNetworkCustomService extends SocialNetworkService {

  constructor(override http: HttpService) {
    super(http);
  }
}
