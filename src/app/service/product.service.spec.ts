import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { ProductsService } from './product.service';
import { TokenService } from './token.service';

describe('ProductService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        TokenService, // se puede inyectar directo con servicio real o con spy
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ],
    });
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    // corre al final de cada prueba
    // httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('test for getAllSimple', () => {
    it('Should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(2);
      spyOn(tokenService, 'getToken').and.returnValue('123'); // spy con servicio real, mock de una parte del servicio
      // Act
      service.getAllSimple().subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http config
      const req = httpTestingController.expectOne(
        'https://api.escuelajs.co/api/v1/products'
      );
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 123');
      req.flush(mockData);
      // httpTestingController.verify(); // verifica el mock
    });
  });

  describe('test for getAll', () => {
    it('Should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(2);
      // Act
      service.getAll().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http config
      const req = httpTestingController.expectOne(
        'https://api.escuelajs.co/api/v1/products'
      );
      req.flush(mockData);
    });
    it('should return product list with taxes', (doneFn) => {
      // arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * 0.19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * 0.19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // 0 * 0.19 = 0
        },
        {
          ...generateOneProduct(),
          price: -100, // 100 * 0.19 = 0
        },
      ];
      // Act
      service.getAll().subscribe((data) => {
        // Assert
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });

      // http config
      const req = httpTestingController.expectOne(
        'https://api.escuelajs.co/api/v1/products'
      );
      req.flush(mockData);
      // httpTestingController.verify(); // verifica el mock
    });

    it('Should send query params with limit 10 and offset 3', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(2);
      const limit = 10;
      const offset = 3;
      // Act
      service.getAll(limit, offset).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http config
      const req = httpTestingController.expectOne(
        `https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`
      );
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());
      // httpTestingController.verify(); // verifica el mock
    });
  });

  describe('test for create', () => {
    it('should create a new product', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'title',
        price: 100,
        description: 'description',
        images: ['image1', 'image2'],
        categoryId: 12,
      };
      // Act
      service.create({ ...dto }).subscribe((data) => {
        // para objetos y arrays que no tengan proglemas de mutación
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http config
      const req = httpTestingController.expectOne(
        'https://api.escuelajs.co/api/v1/products'
      );
      req.flush(mockData);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(dto);
      // httpTestingController.verify(); // verifica el mock
    });
  });

  describe('test for update', () => {
    it('should update a product', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'title',
        price: 100,
        description: 'description',
      };
      // Act
      service.update(mockData.id, { ...dto }).subscribe((data) => {
        // para objetos y arrays que no tengan proglemas de mutación
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http config
      const req = httpTestingController.expectOne(
        `https://api.escuelajs.co/api/v1/products/${mockData.id}`
      );
      req.flush(mockData);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(dto);
      // httpTestingController.verify(); // verifica el mock
    });
  });

  describe('test for delete', () => {
    it('should delete a product', (doneFn) => {
      // Arrange
      const mockData = true;
      const productId = '1';
      // Act
      service.delete(productId).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http config
      const req = httpTestingController.expectOne(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      );
      req.flush(mockData);
      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('test for getOne', () => {
    it('should return a product', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      const productId = '1';
      // Act
      service.getOne(productId).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http config
      const req = httpTestingController.expectOne(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    });
    it('should return error 404', (doneFn) => {
      // Arrange
      const msgError = '404 msg error';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError,
      };
      const productId = '1';
      // Act
      service.getOne(productId).subscribe({
        error: (err) => {
          // Asert
          expect(err).toEqual('El producto no existe');
          doneFn();
        },
      });
      // http config
      const req = httpTestingController.expectOne(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      );
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });
  });
});
