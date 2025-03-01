import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Settings } from '../../models/Settings';
import { SessionStorageService } from '../../shared/util/session-storage.service';
import { SettingsService } from '../generated/SettingsService';
import { HttpService } from '../services';

//////

@Injectable({
  providedIn: 'root'
})
export class SettingsCustomService extends SettingsService {
  settings: Settings[] = [];

  constructor(
    override http: HttpService,
    private _sessionStorage: SessionStorageService
  ) {
    super(http);
  }

  get json() {
    return this.load();
  }

  async load() {
    this.settings = this._sessionStorage.getObjectCache<Array<Settings>>(
      'settings'
    ) || [];
    if (!this.settings.length) {
      this.settings = await this.getJson().toPromise() || [];
    }
    return this.settings;
  }

  getByKey(key: string) {
    const result = this.settings.filter(x => (x.key == key));
    if (result.length === 1) {
      return result[0];
    }
    return {};
  }
}
