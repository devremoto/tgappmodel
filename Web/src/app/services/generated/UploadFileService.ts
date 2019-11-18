import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UploadFile } from '../../models/UploadFile';
import { PagingModel } from '../../models/PagingModel';
import { HubService } from '../hub.service';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService extends BaseService<UploadFile> {

  constructor(protected _http: HttpService, public hubService: HubService) {
    super(_http, hubService);
    this.controller = 'UploadFile';
    this.hubService.registerCrud(this.controller);
  }

  getOne(entity: UploadFile): Observable<UploadFile> {
    return this._http.get(`UploadFile/getOne/${entity.id}`)
      .map<any, UploadFile>((response) => response);
  }

  remove(entity: UploadFile): Observable<UploadFile> {
    return this.removeById(`${entity.id}`)
      .map<any, UploadFile>((response) => response);
  }

}
