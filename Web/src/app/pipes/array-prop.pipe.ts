import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayProp'
})
export class ArrayProp implements PipeTransform {

  transform(value: any, prop: string): any {
    if (value) {
      return value[prop]
    }
    return null;
  }

}
