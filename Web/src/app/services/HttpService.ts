import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Config } from '../config';

@Injectable({ providedIn: 'root' })
export class HttpService {
  options: {};
  config = {} as any;

  constructor(private http: HttpClient) {
    this.config = Config;
  }

  prepareUrl(url: string, usePrefix = true): string {
    if (url.indexOf('://') === -1 && usePrefix) {
      return this.config.apiAddress + url;
    }
    return url;
  }

  upload(files: any[], obj: any) {
    const formData = this.loadData(files, obj);
    return this.http.post(`${this.config.siteUrl}/file/upload`, formData);
  }

  upload64(data: string, obj: any) {
    const formData = new FormData();
    if (obj) {
      formData.append('model', JSON.stringify(obj));
    }
    formData.append('file', data);
    return this.http.post(`${this.config.siteUrl}/file/upload`, formData);
  }

  apiUpload(url: string, files: any, obj: any) {
    const formData = this.loadData(files, obj);
    return this.post<any>(url, formData);
  }

  apiUpload64(url: string, data: string, name: string, obj?: any) {
    const formData = new FormData();
    if (obj) {
      formData.append('model', JSON.stringify(obj));
    }
    formData.append(name || 'file0', data);
    return this.post<any>(url, formData);
  }

  removeFile(fileName: string) {
    return this.get(`${this.config.siteUrl}/file/remove/${fileName}`);
  }

  image(fileName: string, controller: string, w?: number, h?: number, base64 = false) {
    return this.get(`${this.config.siteUrl}/file/image/${fileName}`, {
      w: w || 0,
      h: h || 0,
      base64: base64,
      controller: controller
    });
  }

  apiImage(fileName: string, controller: string, w?: number, h?: number, base64 = false) {
    return this.get(`${this.config.apiAddress}/file/image/${fileName}`, {
      w: w || 0,
      h: h || 0,
      base64: base64,
      controller: controller
    });
  }

  private loadData(files: any[], obj: any) {
    const data = new FormData();
    if (obj) {
      data.append('model', JSON.stringify(obj));
    }
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        data.append('file' + i, files[i]);
      }
    }
    return data;
  }

  post<T>(url: string, object: any) {
    return this.http.post<T>(this.prepareUrl(url), object);
  }

  save<T>(url: string, object: any, edit = false) {
    if (edit) {
      return this.update<T>(url, object);
    }

    return this.post<T>(url, object);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(this.prepareUrl(url));
  }

  update<T>(url: string, object: any) {
    return this.http.put<T>(this.prepareUrl(url), object);
  }

  get<T>(url: string, params?: any, usePrefix = true) {
    return this.http.get<T>(this.prepareUrl(url + (params ? this.param(params) : ''), usePrefix), this.options);
  }

  getLink(url: string, params?: any, usePrefix = true) {
    return this.prepareUrl(url + (params ? this.param(params) : ''), usePrefix);
  }
  param(obj: any) {
    const params = new URLSearchParams();
    for (const key in obj) {
      if (obj[key] && typeof obj[key] !== 'object') {
        params.set(key, obj[key]);
      }
    }
    if (params.toString()) {
      return '?' + params.toString();
    }
    return '';
  }
}
