import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { FileModel } from '../models/FileModel';
import { PagingModel } from '../models/PagingModel';
import { UploadModel } from '../models/UploadModel';
import { HttpService } from './HttpService';
import { HubService } from './hub.service';

@Injectable({ providedIn: 'root' })
export class BaseService<T> {
  public page: PagingModel<T> = new PagingModel<T>();
  protected controller: string;
  private emitter: Subject<any>;

  constructor(
    protected httpService: HttpService,
    public hubService: HubService
  ) {
    this.emitter = new Subject<any>();
    if (!this.controller) {
      const comp: T = Object.assign({}, {} as T, {});

      this.controller = (comp as T).constructor.name;
    }
  }

  getAll(): Observable<T[]> {
    return this.httpService.get(this.controller).pipe(
      map<any, T[]>(response => {
        this.emit(this.controller + '-getAll', response);
        return response;
      })
    );
  }

  getJson(): Observable<T[]> {
    return this.httpService.get(this.controller + '/GetJson').pipe(
      map<any, T[]>(response => {
        this.emit(this.controller + '-getJson', response);
        return response;
      })
    );
  }

  getPage(page: PagingModel<T>): Observable<PagingModel<T>> {
    this.page = page;

    return this.httpService
      .post(this.controller + '/getAllPage', this.page)
      .pipe(
        map<any, PagingModel<T>>((response) => {
          return response;
        })
      );
  }

  getLink(method: string, params?: any): string {
    return this.httpService.getLink(`${this.controller}/${method}`, params);
  }

  getById(id: any): Observable<T> {
    return this.httpService.get(`${this.controller}/${id}`).pipe(
      map<any, T>(response => {
        this.emit(this.controller + '-getOne', response);
        return response as T;
      })
    );
  }

  getOne(id: any): Observable<T> {
    return this.httpService.get(`${this.controller}/${id}`).pipe(
      map<any, T>(response => {
        this.emit(this.controller + '-getOne', response);
        return response as T;
      })
    );
  }

  post<TResult>(method: string, params?: any): Observable<TResult> {
    return this.httpService.post(`${this.controller}/${method}`, params).pipe(
      map<any, TResult>(response => {
        return response;
      })
    );
  }

  get<TResult>(method: string, params?: any): Observable<TResult> {
    return this.httpService.get(`${this.controller}/${method}`, params).pipe(
      map<any, TResult>(response => {
        return response;
      })
    );
  }
  apiUpload64(data: string, name?: string, entity?: any) {
    return this.httpService.apiUpload64(
      `${this.controller}/upload`,
      data,
      name,
      { entity, files: [{ name }] }
    );
  }

  apiUpload(data: string, entity?: any) {
    return this.httpService.apiUpload(
      `${this.controller}/upload`,
      data,
      entity
    );
  }

  upload64(data: string, entity?: any) {
    return this.httpService.upload64(data, entity);
  }

  upload(inputFiles: any[], entity: any): Observable<UploadModel> {
    let files = [];
    let fields: Array<FileModel> = new Array<FileModel>();

    for (const obj of inputFiles) {
      fields.push({
        id: obj.id,
        name: obj.name,
        inputFileField: obj.name,
        controller: this.controller
      } as FileModel);

      for (const file of obj.files) {
        files.push(file);
      }
    }

    if (files && files.length > 0) {
      return this.httpService
        .upload(files, { entity, files: fields })
        .map<any, UploadModel>(response => {
          const obj = response as UploadModel;
          if (obj) {
            for (const file of obj.files) {
              const splitted = file.inputFileField.split('.');
              const props = Object.getOwnPropertyNames(entity);

              file.name = splitted[splitted.length - 1];

              if (props.indexOf(file.inputFileField)) {
                obj.entity[file.inputFileField] = file.fileName;
              }
            }
            this.emit(this.controller + '-upload', obj);
            files = [];
            fields = [];

            return obj;
          }
          return null;
        });
    }

    return new Observable<UploadModel>(x => {
      x.next({ entity, files: fields } as UploadModel);
    });
  }

  image(
    fileName: string,
    controller?: string,
    w?: number,
    h?: number,
    base64: boolean = false
  ) {
    return this.httpService
      .image(fileName, controller, w, h, base64)
      .map<any, T>(response => {
        this.emit(this.controller + '-image', response);
        if (base64) {
          return response._body;
        } else {
          return response as T;
        }
      });
  }

  apiRemoveFile(fileName) {
    return this.get(`file/remove/${fileName}`);
  }

  removeFile(fileName) {
    return this.httpService.removeFile(fileName);
  }

  save(entity: T, edit?: boolean, inputFiles?: any[]): Observable<T> {
    if (inputFiles && inputFiles.length > 0) {
      return this.upload(inputFiles, entity).pipe(
        mergeMap(result => this.callSave(result.entity, edit))
      );
    } else {
      return this.callSave(entity, edit);
    }
  }

  private callSave(entity: T, edit?: boolean): Observable<T> {
    return this.httpService.save(this.controller, entity, edit).pipe(
      map<any, T>(response => {
        const obj = response;
        this.emit(this.controller + '-save', obj);
        return obj;
      })
    );
  }

  removeById(entity: string) {
    return this.httpService.delete(`${this.controller}/${entity}`).pipe(
      map(() => {
        this.emit(this.controller + '-remove', entity);
      })
    );
  }

  on(key: any): Observable<any> {
    const observer = this.emitter.asObservable();
    return observer
      .pipe(
        filter(event => {
          return event.key === key || event.key === `${this.controller}-${key}`;
        })
      )
      .pipe(
        map(event => {
          if (event.data) {
            return event.data as T;
          }
          return null;
        })
      );
  }

  emit(key: any, data?: any) {
    this.emitter.next({ key, data });
  }

  setControler(controller: string): void {
    this.controller = controller;
  }
}
