import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Person } from 'src/app/models/person.model';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PersonComponent } from '../person/person.component';
import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a list app-person component', () => {
    // arrange
    component.people = [
      new Person('Navarro', 'Samuel', 4, 15, 90),
      new Person('Navarro', 'Leslye', 30, 76, 1.65),
      new Person('Navas', 'Daniel', 32, 76, 1.65),
    ];
    // act
    fixture.detectChanges();
    const debEle: DebugElement[] = fixture.debugElement.queryAll(
      By.css('app-person')
    ); // despues de la deteccion de cambios por que no encuentra los datos que le estoy pasando
    // assert
    expect(debEle.length).toEqual(component.people.length);
  });

  it('should raise selected event when clicked', () => {
    // arrange
    const buttonDebug: DebugElement = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    // act
    buttonDebug.triggerEventHandler('click', null);
    // fixture.detectChanges(); no renderizamos nada pero es buena practica
    // assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render the selectedPerson', () => {
    // arrange
    const buttonDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    // act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDebug = fixture.debugElement.query(
      By.css('.selectedPerson ul > li')
    );
    // assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDebug.nativeElement.textContent).toContain(
      component.selectedPerson?.name
    );
  });
});
