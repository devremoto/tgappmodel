import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Config } from '../config';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HubService {
  private emitter: Subject<any>;
  constructor() {
    this.emitter = new Subject<any>();
    this.startConnection();
  }

  private hubConnection: HubConnection;

  public startConnection() {
    if (!this.hubConnection) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`${Config.apiAddress.replace('api/', '')}NotificationHub`)
        .build();

      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err));
    }
  }

  registerCrud(controller: string) {
    console.log(`controller registred ${controller}`);
    this.register(`${controller}GetOne`);
    this.register(`${controller}GetAll`);
    this.register(`${controller}GetJson`);
    this.register(`${controller}GetAllPage`);
    this.register(`${controller}Create`);
    this.register(`${controller}Update`);
    this.register(`${controller}Remove`);
  }

  register(key: any) {
    this.hubConnection.on(key, data => {
      console.log(`Event received from hub ${key}`);
      console.log(data);
      this.emitter.next({ key, data });
    });
  }

  invoke(key: any, data?: any) {
    this.hubConnection.invoke(key, data);
    this.emitter.next({ key, data });
  }

  emit(key: any, data?: any) {
    this.hubConnection.invoke(key, data);
    this.emitter.next({ key, data });
  }

  on(key: any): Observable<any> {
    const observer = this.emitter.asObservable();
    return observer
      .pipe(
        filter(event => {
          return event.key === key;
        })
      )
      .pipe(
        map(event => {
          if (event.data) {
            return event.data;
          }
          return null;
        })
      );
  }
}
