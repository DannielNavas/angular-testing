import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/service/product.service';
import { ProductComponent } from '../product/product.component';

import { By } from '@angular/platform-browser';
import {
  asyncData,
  asyncError,
  mockObservable,
  mockPromise,
} from 'src/testing';
import { ValueService } from '../../service/value.service';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let httpController: HttpTestingController;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]);
    const valueEserviceSpy = jasmine.createSpyObj('ValueService', [
      'getPromiseValue',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: ValueService, useValue: valueEserviceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    httpController = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    // TODO: Ejecuta antes de cada prueba
    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(mockObservable(productsMock));
    fixture.detectChanges(); //  se ejecuta el ngOnInit
  });

  it('should create', () => {
    //TODO: Ejecución desde cada prueba
    // const productsMock = generateManyProducts(3);
    // productService.getAll.and.returnValue(of(productsMock));
    // fixture.detectChanges(); //  se ejecuta el ngOnInit
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('should return product list from service', () => {
      // arrange
      const productsMock = generateManyProducts(10);
      const countPreview = component.products.length;
      productService.getAll.and.returnValue(of(productsMock));
      // act
      component.getAllProducts();
      fixture.detectChanges();
      // assert
      expect(component.products.length).toEqual(
        productsMock.length + countPreview
      );
    });

    it('should change the status "loading" => "success"', fakeAsync(() => {
      //arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(
        asyncData(productsMock) // TODO: simula una respuesta asincrona tiene demora en la respuesta -> resolve resuelve en exitoso
      );
      // act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(); //TODO: ejecuta todo lo que este pendiente, observables, setTimeOut, promesas, etc -> debe usarse con un fakeAsync
      fixture.detectChanges();
      // assert
      expect(component.status).toEqual('success');
    }));

    it('should change the status "loading" => "error"', fakeAsync(() => {
      //arrange
      productService.getAll.and.returnValue(
        asyncError('error') // TODO: simula una respuesta asincrona tiene demora en la respuesta ->  reject resuelve en error
      );
      // act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(4000); //TODO: ejecuta todo lo que este pendiente, observables, setTimeOut, promesas, etc -> debe usarse con un fakeAsync -> con el setTimeOut de 3 segundos se debe incluir el tiempo de espera
      fixture.detectChanges();
      // assert
      expect(component.status).toEqual('error');
    }));
  });
  describe('test for callPromise', () => {
    it('shoould call to promise', async () => {
      // arrange
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(mockPromise(mockMsg));
      // act
      await component.callPromise();
      fixture.detectChanges();
      // assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('shoould call to promise fakeAsync', fakeAsync(() => {
      // arrange
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(mockPromise(mockMsg));
      // act
      component.callPromise();
      tick();
      fixture.detectChanges();
      // assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    }));

    it('should show "my mock string" in <p> when btn was clicked', fakeAsync(() => {
      // arrange
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(mockPromise(mockMsg));
      const btnDe = fixture.debugElement.query(By.css('.btn-promise'));
      // act
      // intentar emular las acciones del usuario
      btnDe.triggerEventHandler('click', null);
      tick(); // resuelve la promesa
      fixture.detectChanges();
      const rtaDe = fixture.debugElement.query(By.css('.rta'));
      // assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(rtaDe.nativeElement.textContent).toEqual(mockMsg);
    }));
  });
});
