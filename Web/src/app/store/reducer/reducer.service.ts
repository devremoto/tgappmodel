import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { createStore, Store } from 'redux';

import { BaseService } from '../../services/BaseService';

export const actions = {
  GET_ALL: 'GET_ALL',
  GET_BY_ID: 'GET_BY_ID',
  UPDATE_CLIENT: 'UPDATE_CLIENT',
  GET_SINGLE: 'GET_SINGLE'
};

@Injectable()
export class ReducerService<T> {
  public store: Store<Entity<T>> = createStore<Entity<T>, any, any, any>(this.reducer);

  constructor(public redux: NgRedux<Entity<T>>, private _service: BaseService<T>) {
    this.store = createStore<Entity<T>, any, any, any>(this.reducer);
  }

  public reducer(state: Entity<T>, action) {
    switch (action.type) {
      case actions.UPDATE_CLIENT:
        return <Entity<T>>{ single: action.single, list: [action.single] };
      case actions.GET_SINGLE:
        return <Entity<T>>{ single: action.single, list: [action.single] };
      case actions.GET_ALL:
        return <Entity<T>>{ single: action.list[0], list: action.list };
      default:
        return state;
    }
  }

  public loadAll() {
    this._service.getAll().subscribe(result => {
      this.dispatch({ type: actions.GET_ALL, list: result });
    });
  }

  public loadById(id: any) {
    this._service.getById(id).subscribe(result => {
      this.dispatch({ type: actions.GET_BY_ID, single: result });
    });
  }

  public dispatch(action) {
    this.redux.dispatch(action);
  }

  public configureStore() {
    const entity: Entity<T> = {
      single: <T>{},
      list: <Array<T>>[{}]
    };
    this.redux.configureStore(this.reducer, entity);
  }

  public setController(controller: string) {
    this._service.setControler(controller);
  }

  selectorSingle(model: Entity<T>) {
    return model.single;
  }
  selectorList(model: Entity<T>) {
    return model.list;
  }
}

export interface Entity<T> {
  single: T;
  list: Array<T>;
}
