import { defer, of } from 'rxjs';

// async data para las pruebas unitarias
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError(error: unknown) {
  return defer(() => Promise.reject(error));
}
// la T es para que sea generico
export function mockObservable<T>(data: T) {
  return of(data);
}

export function mockPromise<T>(data: T) {
  return Promise.resolve(data);
}
