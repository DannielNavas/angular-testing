import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Component } from '@angular/core';
import { queryAllByDirective, RouterLinkDirectiveStub } from 'src/testing';

@Component({
  selector: 'app-banner',
})
class BannerStubComponent {}
@Component({
  selector: 'app-footer',
})
class FooterStubComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      // TODO: se agrega el compoennte real desventaja si tiene mucha logica es mas complejjo hacer el mocking de app component
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        // TODO: se agrega el componente mock para no utilizar el componente real
        BannerStubComponent,
        FooterStubComponent,
      ],
      //TODO : ignora los componentes que se estan utilizando sin declararlos
      // schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angular-testing'`, () => {
    expect(component.title).toEqual('angular-testing');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.container h1')?.textContent).toContain(
      'Angular testing'
    );
  });

  it('shoul there are 7 routerLinks', () => {
    // TODO: PRUEBAS PARA EL ROUTERlINK
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);

    expect(links.length).toBe(7);
  });

  it('shoul there are 7 routerLinks with mach routes', () => {
    // TODO: pRUEBAS PARA EL ROUTERlINK que coincida con las rutas
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    // TODO: en angular cuando creamos directivas se crea una dependencia del componente
    const routerLinks = links.map((link) =>
      link.injector.get(RouterLinkDirectiveStub)
    );
    // TODO: se obtiene el linkParams de cada routerLink y se compara con las rutas
    expect(routerLinks[0].linkParams).toEqual('/');
    expect(routerLinks[1].linkParams).toEqual('/products');
  });
});
