import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  private value = 'my value';

  getValue() {
    return this.value;
  }
  setValue(value: string) {
    this.value = value;
  }

  getPromiseValue() {
    return Promise.resolve('value from a promise');
  }

  getObservableValue() {
    return of('Value from an observable')
  }
}
