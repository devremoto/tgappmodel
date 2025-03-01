import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {


  public setObjectCache<TT>(key: string, value: TT) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public get localStorage() {
    return getLocalStorage();
  }

  public get sessionStorage() {
    return getSessionStorage();
  }

  getLocaltorage() {
    return this.sessionStorage;
  }

  public getObjectCache<TT>(key: string) {
    const result = sessionStorage.getItem(key);
    if (result) {
      return <TT>JSON.parse(result);
    }
    return null;
  }

  public setCache(key: string, value: string) {
    this.sessionStorage.setItem(key, value);
  }

  public getCache(key: string) {
    return this.sessionStorage.getItem(key);
  }

  public removeCache(key: string) {
    this.sessionStorage.removeItem(key);
  }

  public setLocalCache(key: string, value: string) {
    this.localStorage.setItem(key, value);
  }

  public getLocalCache(key: string) {
    return this.localStorage.getItem(key);
  }

  public removeLocalCache(key: string) {
    this.localStorage.removeItem(key);
  }
}

export function getLocalStorage() {
  return localStorage;
}

export function getSessionStorage() {
  return sessionStorage;
}
