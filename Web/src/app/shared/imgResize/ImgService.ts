import { Injectable } from '@angular/core';

import { BaseService, HttpService } from '../../services/services';

@Injectable()
export class ImgService extends BaseService<string> {
  controller: string;
  constructor(private http: HttpService) {
    super(http);
    this._controller = '';
  }
}
