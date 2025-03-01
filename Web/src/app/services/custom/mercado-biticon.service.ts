/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService, HttpService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class MercadoBitcoinService extends BaseService<any> {
  override _controller = 'http://localhost:8080';
  coin = 'XRP';
  constructor(protected _http: HttpService) {
    super(_http);
  }

  trades(coin?): Observable<any> {
    return this._http.get(`${this._controller}/${coin ? coin : this.coin}/trades`);
  }

  ticker(coin?): Observable<any> {
    return this.get(`${coin ? coin : this.coin}/ticker`);
  }

  orderbook(coin?): Observable<any> {
    return this.get(`${coin ? coin : this.coin}/orderbook`);
  }
}
