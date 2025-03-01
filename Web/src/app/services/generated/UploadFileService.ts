import { Injectable } from '@angular/core';
import { BaseService, HttpService } from '../services';
import { Observable, map } from 'rxjs';

import { UploadFile } from '../../models/UploadFile';

@Injectable({
    providedIn: 'root',
})
export class UploadFileService extends BaseService<UploadFile> {

    constructor(protected http: HttpService) {
        super(http);
        this._controller = 'UploadFile';
    }

    override getOne(entity: UploadFile): Observable<UploadFile> {
        return this.http.get(`UploadFile/getOne/${entity.id}`)
            .pipe(
                map<any, UploadFile>((response: any) => response)
            )
    }

    remove(entity: UploadFile): Observable<UploadFile> {
        return this.removeById(`${entity.id}`)
            .pipe(
                map<any, UploadFile>((response: any) => response)
            )
    }

}
