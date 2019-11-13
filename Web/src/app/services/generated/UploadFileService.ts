import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UploadFile } from '../../models/UploadFile';
import { PagingModel } from '../../models/PagingModel';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService extends BaseService<UploadFile> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'UploadFile';
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
