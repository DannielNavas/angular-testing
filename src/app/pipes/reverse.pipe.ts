import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    // reversa el string se puede optimizar
    return value.split('').reverse().join('');
  }
}
