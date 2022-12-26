import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;
  beforeEach(() => {
    // se crea antes de cada instancia nueva

    const spy = jasmine.createSpyObj('ValueService', ['getValue']); // se crea un objeto fake con el metodo getValue

    TestBed.configureTestingModule({
      providers: [MasterService, { provide: ValueService, useValue: spy }],
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(
      ValueService
    ) as jasmine.SpyObj<ValueService>;
  });

  it('Should create', () => {
    expect(masterService).toBeTruthy();
  });

  // se pasa el servicio real
  // it('should return "other value" from the fake service', () => {
  //   const valueService = new ValueService();
  //   const masterService = new MasterService(valueService);
  //   expect(masterService.getValue()).toBe('my value');
  // });

  // // se pasa el servicio fake creado por nosotros
  // it('should return "my value" from the real service', () => {
  //   const valueFakeService = new ValueFakeService();
  //   const masterService = new MasterService(
  //     valueFakeService as unknown as ValueService
  //   );
  //   expect(masterService.getValue()).toBe('my value');
  // });

  // // se crea objeto fake con el metodo getValue
  // it('should return "other value" from the fake object', () => {
  //   const fake = {
  //     getValue: () => 'other value',
  //   };
  //   const masterService = new MasterService(fake as ValueService);
  //   expect(masterService.getValue()).toBe('other value');
  // });

  it('should call to getValue from ValueService', () => {
    // const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('Fake value Spy');

    expect(masterService.getValue()).toBe('Fake value Spy'); // pasa aunque solo se devuelva el valor
    expect(valueServiceSpy.getValue).toHaveBeenCalled(); // falla si no se llama al metodo
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1); // Valida que se llame una vez
  });
});
