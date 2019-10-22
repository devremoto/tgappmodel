import { Injectable } from '@angular/core';
import { HttpService } from '../services';
import { AboutService } from '../generated/AboutService';

@Injectable({
  providedIn: 'root',
})
export class AboutCustomService extends AboutService {

    constructor(protected _http: HttpService) {
        super(_http);
    }
}
