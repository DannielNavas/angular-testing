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
import { defer, of } from 'rxjs';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/service/product.service';
import { ProductComponent } from '../product/product.component';

import { ValueService } from '../../service/value.service';
import { ProductsComponent } from './products.component';

fdescribe('ProductsComponent', () => {
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
    // Ejecuta antes de cada prueba
    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges(); //  se ejecuta el ngOnInit
  });

  it('should create', () => {
    // Ejecución desde cada prueba
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
        defer(() => Promise.resolve(productsMock)) // simula una respuesta asincrona tiene demora en la respuesta -> resolve resuelve en exitoso
      );
      // act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(); // ejecuta todo lo que este pendiente, observables, setTimeOut, promesas, etc -> debe usarse con un fakeAsync
      fixture.detectChanges();
      // assert
      expect(component.status).toEqual('success');
    }));

    it('should change the status "loading" => "error"', fakeAsync(() => {
      //arrange
      productService.getAll.and.returnValue(
        defer(() => Promise.reject('error')) // simula una respuesta asincrona tiene demora en la respuesta ->  reject resuelve en error
      );
      // act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(4000); // ejecuta todo lo que este pendiente, observables, setTimeOut, promesas, etc -> debe usarse con un fakeAsync -> con el setTimeOut de 3 segundos se debe incluir el tiempo de espera
      fixture.detectChanges();
      // assert
      expect(component.status).toEqual('error');
    }));
  });
  describe('test for callPromise', () => {
    it('shoould call to promise', async () => {
      // arrange
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
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
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      // act
      component.callPromise();
      tick();
      fixture.detectChanges();
      // assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    }));
  });
});
