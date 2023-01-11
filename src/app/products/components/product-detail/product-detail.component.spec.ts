/* eslint-disable @typescript-eslint/no-unused-vars */
import { Location } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { generateOneProduct } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/service/product.service';
import {
  ActivatedRouteStub,
  asyncData,
  getText,
  mockObservable,
} from 'src/testing';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  // TODO: definir el tipado del helper
  let route: ActivatedRouteStub;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    // TODO: instancial el helper para poder utilizar el useValue
    const routeStub = new ActivatedRouteStub();
    const spy = jasmine.createSpyObj('ProductsService', ['getOne']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: ProductsService, useValue: spy },
        { provide: Location, useValue: locationSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    // TODO: Realizar la inyección de dependencias
    // FIXME: truco para que acepte el tipado primero definir como desconocido unknown y seguido definir el tipado correcto
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;

    route.setQueryParamMap({ type: 'costumer' });
  });

  it('should create', () => {
    const productId = '1';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };
    productService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges(); // TODO: corre el ngOnInit
    expect(component).toBeTruthy();
  });

  it('should show the product in the view', () => {
    const productId = '2';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };
    productService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges(); // TODO: corre el ngOnInit
    const title = getText(fixture, 'title');
    const price = getText(fixture, 'price');

    expect(title).toContain(productMock.title);
    expect(price).toContain(productMock.price);
    expect(productService.getOne).toHaveBeenCalledWith(productId);
  });

  it('should go to back whithout id params', () => {
    route.setParamMap({});
    //TODO: llamar al metodo back por medio de jasmine
    location.back.and.callThrough();
    fixture.detectChanges(); // TODO: corre el ngOnInit
    expect(location.back).toHaveBeenCalled();
  });

  it('should change the status "loading" to "success" ', fakeAsync(() => {
    const productId = '2';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };

    productService.getOne.and.returnValue(asyncData(productMock));
    fixture.detectChanges(); // TODO: corre el ngOnInit
    //TODO: siempre comprobar  despues de la deteccion de cambios
    expect(component.status).toBe('loading');
    // TODO: ejecutar el tick para que se ejecute el observable
    tick();
    // TODO: comprobar que el status sea success despues de ejecutar el tick
    expect(component.status).toBe('success');
    expect(productService.getOne).toHaveBeenCalledWith(productId);
  }));

  it('should typeCustumer be "costumer"', () => {
    const productId = '2';
    route.setParamMap({ id: productId });
    route.setQueryParamMap({ type: 'costumer' });
    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };
    productService.getOne.and.returnValue(mockObservable(productMock));
    fixture.detectChanges(); // TODO: corre el ngOnInit
    expect(component.typeCustomer).toEqual('costumer');
  });
});
