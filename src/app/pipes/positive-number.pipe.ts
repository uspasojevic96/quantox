/**
 * PositiveNumber pipe
 * Converts negative number to positive
 *
 * @author Uros Spasojevic
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'positiveNumber'
})
export class PositiveNumberPipe implements PipeTransform {
  /**
   * Pipe transform function
   * Returns positive number
   */
  public transform(value: any): number {
    return value >= 0 ? value : value * -1;
  }
}
