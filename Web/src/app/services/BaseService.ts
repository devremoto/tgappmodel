import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { FileModel } from '../models/FileModel';
import { PagingModel } from '../models/PagingModel';
import { UploadModel } from '../models/UploadModel';
import { HttpService } from './HttpService';

@Injectable({ providedIn: 'root' })
export class BaseService<T> {
  public page: PagingModel<T> = new PagingModel<T>();
  protected _controller: string;
  private _emitter: Subject<any>;

  constructor(protected httpService: HttpService) {
    this._emitter = new Subject<any>();
    if (!this._controller) {
      const comp: T = Object.assign({}, <T>{}, {});

      this._controller = (<T>comp).constructor.name;
    }
  }

  getAll(): Observable<T[]> {
    return this.httpService.get(this._controller).pipe(
      map<any, T[]>(response => {
        this.emit(this._controller + '-getAll', response);
        return response;
      })
    );
  }

  getJson(): Observable<T[]> {
    return this.httpService.get(this._controller + '/GetJson').pipe(
      map<any, T[]>(response => {
        this.emit(this._controller + '-getJson', response);
        return response;
      })
    );
  }

  getPage(page: PagingModel<T>): Observable<PagingModel<T>> {
    this.page = page;

    return this.httpService
      .post(this._controller + '/getAllPage', this.page)
      .pipe(
        map<any, PagingModel<T>>(response => {
          return response;
        })
      );
  }

  getLink(method: string, params?: any): string {
    return this.httpService.getLink(`${this._controller}/${method}`, params);
  }

  getById(id: any): Observable<T> {
    return this.httpService.get(`${this._controller}/${id}`).pipe(
      map<any, T>(response => {
        this.emit(this._controller + '-getOne', response);
        return <T>response;
      })
    );
  }

  getOne(id: any): Observable<T> {
    return this.httpService.get(`${this._controller}/${id}`).pipe(
      map<any, T>(response => {
        this.emit(this._controller + '-getOne', response);
        return <T>response;
      })
    );
  }

  post<TResult>(method: string, params?: any): Observable<TResult> {
    return this.httpService.post(`${this._controller}/${method}`, params).pipe(
      map<any, TResult>(response => {
        return response;
      })
    );
  }

  get<TResult>(method: string, params?: any): Observable<TResult> {
    return this.httpService.get(`${this._controller}/${method}`, params).pipe(
      map<any, TResult>(response => {
        return response;
      })
    );
  }
  apiUpload64(data: string, name?: string, entity?: any) {
    return this.httpService.apiUpload64(
      `${this._controller}/upload`,
      data,
      name,
      { entity: entity, files: [{ name: name }] }
    );
  }

  apiUpload(data: string, entity?: any) {
    return this.httpService.apiUpload(
      `${this._controller}/upload`,
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
      fields.push(<FileModel>{
        id: obj.id,
        name: obj.name,
        inputFileField: obj.name,
        controller: this._controller
      });

      for (const file of obj.files) {
        files.push(file);
      }
    }

    if (files && files.length > 0) {
      return this.httpService
        .upload(files, { entity: entity, files: fields })
        .map<any, UploadModel>(response => {
          const obj = <UploadModel>response;
          if (obj) {
            for (const file of obj.files) {
              const splitted = file.inputFileField.split('.');
              const props = Object.getOwnPropertyNames(entity);

              file.name = splitted[splitted.length - 1];

              if (props.indexOf(file.inputFileField)) {
                obj.entity[file.inputFileField] = file.fileName;
              }
            }
            this.emit(this._controller + '-upload', obj);
            files = [];
            fields = [];

            return obj;
          }
          return null;
        });
    }

    return new Observable<UploadModel>(x => {
      x.next(<UploadModel>{ entity: entity, files: fields });
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
        this.emit(this._controller + '-image', response);
        if (base64) {
          return response._body;
        } else {
          return <T>response;
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
    return this.httpService.save(this._controller, entity, edit).pipe(
      map<any, T>(response => {
        const obj = response;
        this.emit(this._controller + '-save', obj);
        return obj;
      })
    );
  }

  removeById(entity: string) {
    return this.httpService.delete(`${this._controller}/${entity}`).pipe(
      map(() => {
        this.emit(this._controller + '-remove', entity);
      })
    );
  }

  on(key: any): Observable<any> {
    const observer = this._emitter.asObservable();
    return observer
      .pipe(
        filter(event => {
          return (
            event.key === key || event.key === `${this._controller}-${key}`
          );
        })
      )
      .pipe(
        map(event => {
          if (event.data) {
            return <T>event.data;
          }
          return null;
        })
      );
  }

  emit(key: any, data?: any) {
    this._emitter.next({ key, data });
  }

  setControler(controller: string): void {
    this._controller = controller;
  }
}
