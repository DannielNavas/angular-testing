import { FormControl, FormGroup } from '@angular/forms';
import { mockObservable } from 'src/testing';
import { UsersService } from '../service/user.service';
import { MyValidators } from './validators';

fdescribe('test form MyValidators', () => {
  describe('test for validatePassword', () => {
    it('shoul return null when password in right', () => {
      // arrange
      const control = new FormControl();
      control.setValue('123456asd');
      // act
      const rta = MyValidators.validPassword(control);
      // assert
      expect(rta).toBeNull();
    });
    it('shoul return null when password is worng', () => {
      // arrange
      const control = new FormControl();
      control.setValue('asdf');
      // act
      const rta = MyValidators.validPassword(control);
      // assert
      expect(rta?.invalid_password).toBeTrue();
    });
  });

  describe('test for matchPasswords', () => {
    it('should return null', () => {
      // arrange
      const group = new FormGroup({
        password: new FormControl('123456asd'),
        confirmPassword: new FormControl('123456asd'),
      });
      // act
      const rta = MyValidators.matchPasswords(group);
      // assert
      expect(rta).toBeNull();
    });
    it('should return obj with the error', () => {
      // arrange
      const group = new FormGroup({
        password: new FormControl('1234'),
        confirmPassword: new FormControl('123456asd'),
      });
      // act
      const rta = MyValidators.matchPasswords(group);
      // assert
      expect(rta?.match_password).toBeTrue();
    });

    it('should return obj with the error', () => {
      // arrange
      const group = new FormGroup({
        otro: new FormControl('1234'),
        otro2: new FormControl('123456asd'),
      });
      // act
      const fn = () => MyValidators.matchPasswords(group);
      // assert
      // Validar que se lance la excepción se debe encerrar en una funcion para poder obtener el error
      expect(fn).toThrow(new Error('matchPasswords: field not found'));
    });
  });

  describe('test for validateEmailAsync', () => {
    // TODO: doneFn se declara para poder indicar cuando se termina la prueba
    it('should return null with valid email', (doneFn) => {
      // arrange
      // TODO: Crear un spy de un servicio
      const userService: jasmine.SpyObj<UsersService> = jasmine.createSpyObj(
        'UsersService',
        ['isAvailableByEmail']
      );
      const control = new FormControl('dannielnavas@gmail.com');
      // act
      userService.isAvailableByEmail.and.returnValue(
        mockObservable({ isAvailable: true })
      );
      // TODO: esto devuelve una funcion
      const validator = MyValidators.validateEmailAsync(userService);
      validator(control).subscribe((rta) => {
        // assert
        expect(rta).toBeNull();
        doneFn();
      });
    });
  });
});
