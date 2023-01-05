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
import { ReactiveFormsModule } from '@angular/forms';
import { generateOneUser } from 'src/app/models/user.mock';
import { UsersService } from 'src/app/service/user.service';
import { getText, mockObservable, query, setInputValue } from 'src/testing';

import { asyncData } from '../../../../testing/async-data';
import { RegisterFormComponent } from './register-form.component';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let httpController: HttpTestingController;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UsersService', ['create']);
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: UsersService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    httpController = TestBed.inject(HttpTestingController);
    usersServiceSpy = TestBed.inject(
      UsersService
    ) as jasmine.SpyObj<UsersService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the emailField be invalid', () => {
    component.form.controls.email.setValue('test');
    expect(component.form.controls.email.valid)
      .withContext('wrong email')
      .toBeFalsy();
    component.form.controls.email.setValue('');
    // withContext agrega un mensaje para identificar el expect que falla
    expect(component.form.controls.email.invalid)
      .withContext('email empty')
      .toBeTruthy();
  });

  it('should the emailField be invalid with get', () => {
    component.emailField?.setValue('test');
    expect(component.emailField?.valid).toBeFalsy();
    expect(component.emailField?.invalid).toBeTruthy();
  });
  // probar valor a valor porque cada campo tiene una validación diferente
  it('should the passwordField be invalid', () => {
    component.passwordField?.setValue('');
    expect(component.passwordField?.valid).withContext('empty').toBeFalsy();
    component.passwordField?.setValue('12345');
    expect(component.passwordField?.invalid).withContext('12345').toBeTruthy();
    component.passwordField?.setValue('asasasasasas');
    expect(component.passwordField?.invalid)
      .withContext('asasasasasas')
      .toBeTruthy();
    component.passwordField?.setValue('12345asdasdasd');
    expect(component.passwordField?.valid)
      .withContext('12345asdasdasd')
      .toBeTruthy();
  });

  it('should the form be invalid', () => {
    component.form.patchValue({
      name: 'test',
      email: '',
      password: '12345',
      confirmPassword: '12345',
      checkTerms: true,
    });
    expect(component.form.valid).toBeFalsy();
  });

  it('should the emailField be invalid form UI', () => {
    const inputDe = query(fixture, 'input#email');
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    inputEl.value = 'esto no es un correo';
    // escribe en la interfaz
    inputEl.dispatchEvent(new Event('input'));
    // salir del desenfoque para que se ejecute la validación
    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.emailField?.valid).withContext('only email').toBeFalsy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).withContext('text error').toContain("It's not a email");
  });
  it('should the emailField be invalid form UI helper', () => {
    // con helper de forms.ts
    setInputValue(fixture, 'input#email', 'esto no es un correo');
    fixture.detectChanges();
    expect(component.emailField?.valid).withContext('only email').toBeFalsy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).withContext('text error').toContain("It's not a email");
  });

  it('should send the form successfully', () => {
    component.form.patchValue({
      name: 'test',
      email: 'dannielnavas@gmail.com',
      password: '12345asd',
      confirmPassword: '12345asd',
      checkTerms: true,
    });
    const mockUser = generateOneUser();
    usersServiceSpy.create.and.returnValue(mockObservable(mockUser));
    //Act
    // emula el evento submit
    component.register(new Event('submit'));
    expect(component.form.valid).toBeTruthy();
    expect(usersServiceSpy.create).toHaveBeenCalled();
  });

  it('should send the form successfully and "loading" => "success" status', fakeAsync(() => {
    component.form.patchValue({
      name: 'test',
      email: 'dannielnavas@gmail.com',
      password: '12345asd',
      confirmPassword: '12345asd',
      checkTerms: true,
    });
    const mockUser = generateOneUser();
    usersServiceSpy.create.and.returnValue(asyncData(mockUser));
    //Act
    // emula el evento submit
    component.register(new Event('submit'));
    expect(component.status).toEqual('loading');
    tick(); // Ejecuta las tareas pendientes
    fixture.detectChanges();
    expect(component.status).toEqual('success');
    expect(component.form.valid).toBeTruthy();
    expect(usersServiceSpy.create).toHaveBeenCalled();
  }));
});
