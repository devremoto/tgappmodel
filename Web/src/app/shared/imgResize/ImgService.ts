import { Injectable } from '@angular/core';

import { BaseService, HttpService } from '../../services/services';

@Injectable()
export class ImgService extends BaseService<string> {
  controller: string;
  constructor(private _http: HttpService) {
    super(_http);
    this._controller = '';
  }
}
