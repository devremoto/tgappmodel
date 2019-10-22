import { DatePipe } from '@angular/common';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MyNgbDateParserFormatter extends NgbDateParserFormatter {
  datePipe = new DatePipe('pt-Br');
  constructor() {
    super();
  }
  format(date: NgbDateStruct, args?: any): string {
    args = args || 'dd/MM/yyyy';
    if (date === null) {
      return '';
    }
    try {
      return this.datePipe.transform(new Date(date.year, date.month - 1, date.day), args);
    } catch (e) {
      return '';
    }
  }

  parse(value: string): NgbDateStruct {
    let returnVal: NgbDateStruct;
    if (!value) {
      returnVal = null;
    } else {
      try {
        const dateParts = this.datePipe.transform(value, 'M-d-y').split('-');
        returnVal = { year: parseInt(dateParts[2], 10), month: parseInt(dateParts[0], 10), day: parseInt(dateParts[1], 10) };
      } catch (e) {
        returnVal = null;
      }
    }
    return returnVal;
  }
}

export function formatter() {
  return new MyNgbDateParserFormatter();
}
