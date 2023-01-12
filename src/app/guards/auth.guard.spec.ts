/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  fakeActivatedRouteSnapshot,
  fakeParamMap,
  fakeRouterStateSnapshot,
  mockObservable,
} from 'src/testing';
import { AuthService } from '../service/auth.service';

import { generateOneUser } from '../models/user.mock';
import { TokenService } from '../service/token.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let tokenService: jasmine.SpyObj<TokenService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true with session', (doneFn) => {
    const activatedRoute = fakeActivatedRouteSnapshot({
      // params: { idProduct: '1' },
      // data: { idProduct: '1' },
      // queryParams: { idProduct: '1' },
      paramMap: fakeParamMap({ idProduct: '1' }),
    });
    const routerState = fakeRouterStateSnapshot({});
    // TODO: Jasmine solo permite hacer mocking de los metodos y no de los atributos
    const userMock = generateOneUser();
    authService.getUser.and.returnValue(mockObservable(userMock));
    guard.canActivate(activatedRoute, routerState).subscribe((result) => {
      expect(result).toBeTrue();
      doneFn();
    });
  });

  it('should return false with session', (doneFn) => {
    const activatedRoute = fakeActivatedRouteSnapshot({
      // params: { idProduct: '1' },
      // data: { idProduct: '1' },
      // queryParams: { idProduct: '1' },
      paramMap: fakeParamMap({ idProduct: '1' }),
    });
    const routerState = fakeRouterStateSnapshot({});
    // TODO: Jasmine solo permite hacer mocking de los metodos y no de los atributos
    const userMock = generateOneUser();
    authService.getUser.and.returnValue(mockObservable(null));
    guard.canActivate(activatedRoute, routerState).subscribe((result) => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      doneFn();
    });
  });

  it('should return false with idProduct params', (doneFn) => {
    const activatedRoute = fakeActivatedRouteSnapshot({
      // params: { idProduct: '1' },
      // data: { idProduct: '1' },
      // queryParams: { idProduct: '1' },
      paramMap: fakeParamMap({ idProduct: '1' }),
    });
    const routerState = fakeRouterStateSnapshot({});
    // TODO: Jasmine solo permite hacer mocking de los metodos y no de los atributos
    const userMock = generateOneUser();
    authService.getUser.and.returnValue(mockObservable(null));
    guard.canActivate(activatedRoute, routerState).subscribe((result) => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      doneFn();
    });
  });
});
