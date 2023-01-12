//TODO: es por cada modulo que se crea la prueba de integración

import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-people',
})
class PeopleComponent {}
@Component({
  selector: 'app-pico-preview',
})
class PicoPreviewComponent {}
@Component({
  selector: 'app-others',
})
class OthersComponent {}

const routes = [
  { path: 'person', component: PeopleComponent },
  { path: 'pico-preview', component: PicoPreviewComponent },
  { path: 'others', component: OthersComponent },
];

describe('App Integration test', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      // TODO: se agrega el compoennte real desventaja si tiene mucha logica es mas complejjo hacer el mocking de app component
      declarations: [
        AppComponent,
        PeopleComponent,
        PicoPreviewComponent,
        OthersComponent,
      ],
      //TODO : ignora los componentes que se estan utilizando sin declararlos
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //providers
    router = TestBed.inject(Router);
    //TODO: Inicia la navegación
    router.initialNavigation();
    // espera que se complete la navegacion
    tick();
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
