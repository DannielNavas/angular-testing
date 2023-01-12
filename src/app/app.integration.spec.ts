//TODO: es por cada modulo que se crea la prueba de integración

import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { clickElemet, getText, query, queryAllByDirective } from 'src/testing';
import { AppComponent } from './app.component';

import { generateOneUser } from 'src/app/models/user.mock';
import { asyncData, mockObservable } from '../testing/async-data';
import { routes } from './app-routing.module';
import { AppModule } from './app.module';
import { generateManyProducts } from './models/product.mock';
import { AuthService } from './service/auth.service';
import { ProductsService } from './service/product.service';

// @Component({
//   selector: 'app-people',
// })
// class PeopleComponent {}
// @Component({
//   selector: 'app-pico-preview',
// })
// class PicoPreviewComponent {}
// @Component({
//   selector: 'app-others',
// })
// class OthersComponent {}

// const routes = [
//   { path: 'person', component: PeopleComponent },
//   { path: 'pico-preview', component: PicoPreviewComponent },
//   { path: 'others', component: OthersComponent },
// ];

describe('App Integration test', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let productsServices: jasmine.SpyObj<ProductsService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    await TestBed.configureTestingModule({
      //TODO: Se importa primero el moduule y luego se sobre escribe el router
      imports: [AppModule, RouterTestingModule.withRoutes(routes)],
      // TODO: se agrega el compoennte real desventaja si tiene mucha logica es mas complejjo hacer el mocking de app component
      //TODO: ya no se necesita porque se importa el modulo completo app-module
      // declarations: [
      //   AppComponent,
      //   // PeopleComponent,
      //   // PicoPreviewComponent,
      //   // OthersComponent,
      // ],
      //TODO : ignora los componentes que se estan utilizando sin declararlos
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();
  });
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    productsServices = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    //providers
    router = TestBed.inject(Router);
    //TODO: Inicia la navegación
    router.initialNavigation();
    //TODO: espera que se complete la navegacion
    tick();
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 7 routerLinks', () => {
    // TODO: PRUEBAS PARA EL ROUTERlINK
    //TODO: elemento nativo de angular RouterLinkWithHref ejecuta la navegación
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toBe(7);
  });

  it('should render OthersComponent when clicked whith session', fakeAsync(() => {
    const productsMock = generateManyProducts(10);
    productsServices.getAll.and.returnValue(asyncData(productsMock));
    const userMock = generateOneUser();
    authService.getUser.and.returnValue(mockObservable(userMock));

    clickElemet(fixture, 'others-link', true);

    tick(); // TODO: ejecuta que se complete la navegación
    fixture.detectChanges();

    tick(); //TODO: ejecuta al servicio
    fixture.detectChanges();

    expect(router.url).toEqual('/others');
    const element = query(fixture, 'app-others');
    expect(element).not.toBeNull();
    //TODO: pruebas al render
    const text = getText(fixture, 'products-length');
    expect(text).toContain(productsMock.length);
  }));

  it('should render PicoPreviewComponent when clicked', fakeAsync(() => {
    clickElemet(fixture, 'pico-link', true);
    tick();
    fixture.detectChanges(); // TODO: eecuta el ngOninit del componente PicoPreviewComponent
    expect(router.url).toBe('/pico-preview');
    const element = query(fixture, 'app-pico-preview');
    expect(element).not.toBeNull();
  }));

  it('should render OthersComponent when clicked whithout session', fakeAsync(() => {
    authService.getUser.and.returnValue(mockObservable(null));

    clickElemet(fixture, 'others-link', true);

    tick(); // TODO: ejecuta que se complete la navegación
    fixture.detectChanges();

    tick(); //TODO: ejecuta al servicio
    fixture.detectChanges();

    expect(router.url).toEqual('/');
  }));
});
