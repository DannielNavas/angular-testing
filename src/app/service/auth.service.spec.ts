import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Auth } from '../models/auth.model';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenService],
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be create', () => {
    expect(authService).toBeTruthy();
  });
  describe('tests for login', () => {
    it('should return  a token', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: '123',
      };
      const email = 'dannielnavas@gmail.com';
      const password = '123';

      spyOn(tokenService, 'saveToken').and.callThrough(); // callThrough no llama a la funcion real, solo a la funcion spy
      // Act
      authService.login(email, password).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalled();
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledWith(
          mockData.access_token
        );
        doneFn();
      });

      // http config
      const req = httpController.expectOne(
        'https://api.escuelajs.co/api/v1/api/auth/login'
      );
      req.flush(mockData);
    });
  });
});
