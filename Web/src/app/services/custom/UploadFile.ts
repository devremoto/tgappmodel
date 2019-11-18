import { Injectable } from '@angular/core';
import { HttpService } from '../services';
import { UploadFileService } from '../generated/UploadFileService';
import { HubService } from '../hub.service';

@Injectable({
  providedIn: 'root',
})
export class UploadFileCustomService extends UploadFileService {

  constructor(protected _http: HttpService, public hubService: HubService) {
    super(_http, hubService);
  }
}
