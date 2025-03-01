import { Injectable } from '@angular/core';
import { HttpService } from '../services';
import { UploadFileService } from '../generated/UploadFileService';

@Injectable({
  providedIn: 'root',
})
export class UploadFileCustomService extends UploadFileService {

  constructor(override http: HttpService) {
    super(http);
  }
}
