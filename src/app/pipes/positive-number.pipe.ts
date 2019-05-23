import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'positiveNumber'
})
export class PositiveNumberPipe implements PipeTransform {
  public transform(value: any): number {
    return value >= 0 ? value : value * -1;
  }
}
