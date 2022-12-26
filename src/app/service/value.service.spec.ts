import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => { // corre antes de cada prueba (it)
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    // service = new ValueService(); al tener el TestBed no es necesario crear la instancia del servicio

    service = TestBed.inject(ValueService); // se obtiene la inyección de la dependencia del servicio
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('Should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });
  describe('Test for setValue', () => {
    it('Should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('new value');
      expect(service.getValue()).toBe('new value');
    });
  });

  describe('Test for promise', () => {
    it('Should return "value from a promise" from promise with then', (doneFn) => { // se declara el done function
      service.getPromiseValue().then(value => {
        expect(value).toBe('value from a promise');
        doneFn(); // indica donde se termina la prueba
      }
      );
    })
    it('Should return "value from a promise" from promise with async', async () => { // tambien se puede utilizar async await para resolver promesas en las pruebas
      const value = await service.getPromiseValue();
      expect(value).toBe('value from a promise');
    });
  });
  describe('Test for observable', () => {
    it('Should return "Value from an observable" from observable with subscribe', (doneFn) => { // se declara el done function
      service.getObservableValue().subscribe(value => {
        expect(value).toBe('Value from an observable');
        doneFn(); // indica donde se termina la prueba
      }
      );
    })
    it('Should return "Value from an observable" from observable with async', async () => { // tambien se puede utilizar async await para resolver promesas en las pruebas
      const value = await service.getObservableValue().toPromise();
      expect(value).toBe('Value from an observable');
    });
  });
});
