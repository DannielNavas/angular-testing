import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    // component.person = new Person('Daniel', 'Gonzalez', 25, 55, 1.75);  // PAra que este este objeto en todas las pruebas
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Daniel"', () => {
    component.person = new Person('Navas', 'Daniel', 25, 55, 1.75);
    expect(component.person.name).toEqual('Daniel');
  });

  it('shhould have <p> with "Soy un parrafo"', () => {
    component.person = new Person('Navarro', 'Leslye', 25, 55, 1.75);
    const expectMsg = `Mi altura es ${component?.person?.height}`;
    const personDebugElement: DebugElement = fixture.debugElement; // esto para obtener el elemento de forma agnostica a la plataforma
    const pDebug: DebugElement = personDebugElement.query(By.css('p')); // selectores complejos con By.css igual es agnostico a la plataforma
    const personElement: HTMLElement = personDebugElement.nativeElement;
    const pDegugElement: HTMLElement = pDebug.nativeElement;
    const p = personElement.querySelector('p');
    fixture.detectChanges();
    expect(p?.textContent).toEqual(expectMsg);
    expect(pDegugElement?.textContent).toEqual(expectMsg);
  });
  it('shhould have <h3> with "Hola, {person.name}"', () => {
    // arrange
    component.person = new Person('Navarro', 'Leslye', 25, 55, 1.75);
    const expectMsg = `Hola, ${component?.person?.name}`;
    const personDebugElement: DebugElement = fixture.debugElement; // esto para obtener el elemento de forma agnostica a la plataforma
    const h3Debug: DebugElement = personDebugElement.query(By.css('h3')); // selectores complejos con By.css igual es agnostico a la plataforma
    const personElement: HTMLElement = personDebugElement.nativeElement;
    const h3DegugElement: HTMLElement = h3Debug.nativeElement;
    const h3 = personElement.querySelector('h3'); // nativo del navegador
    // act
    fixture.detectChanges();
    // assert
    expect(h3?.textContent).toEqual(expectMsg);
    expect(h3DegugElement?.textContent).toEqual(expectMsg);
  });

  it('should display a test with IMC when call calcIMC', () => {
    // arrange
    const expectMsg = `Bajo peso`;
    component.person = new Person('Navarro', 'Samuel', 4, 15, 80);
    const button: HTMLElement = fixture.debugElement.query(
      By.css('button.btn-imc')
    ).nativeElement;
    // act
    component.calcIMC(); // Ejecuta directamente el metodo
    fixture.detectChanges();
    // assert
    expect(component.imc).toEqual(expectMsg);
    expect(button.textContent).toContain(expectMsg);
  });

  it('should display a test with IMC when do click', () => {
    // arrange
    const expectMsg = `Bajo peso`;
    component.person = new Person('Navarro', 'Samuel', 4, 15, 80);
    const buttonDebug: DebugElement = fixture.debugElement.query(
      By.css('button.btn-imc')
    );
    const buttonElement: HTMLElement = buttonDebug.nativeElement;
    // act
    buttonDebug.triggerEventHandler('click', null); // Ejecuta el evento click
    fixture.detectChanges();
    // assert
    expect(component.imc).toEqual(expectMsg);
    expect(buttonElement.textContent).toContain(expectMsg);
  });
});
