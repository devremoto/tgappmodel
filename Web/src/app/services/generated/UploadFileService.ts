import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { map, Observable } from 'rxjs';

import { UploadFile } from '../../models/UploadFile';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService extends BaseService<UploadFile> {

    constructor(protected _http: HttpService) {
        super(_http);
            this._controller = 'UploadFile';
    }

    override getOne(entity: UploadFile): Observable<UploadFile> {
        return this._http.get<UploadFile>(`UploadFile/getOne/${entity.id}`)
        .pipe(map<UploadFile, UploadFile>((response) => response));
    }

    remove(entity: UploadFile): Observable<void> {
        return this.removeById(`${entity.id}`);
    }

}
