import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HighligthDirective } from 'src/app/directives/highligth.directive';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';

import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/service/product.service';
import { mockObservable } from '../../../testing/async-data';
import { OthersComponent } from './others.component';

describe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]);
    await TestBed.configureTestingModule({
      declarations: [OthersComponent, ReversePipe, HighligthDirective],
      imports: [FormsModule],
      providers: [{ provide: ProductsService, useValue: productsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    const productsMock = generateManyProducts(10);
    productsService.getAll.and.returnValue(mockObservable(productsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
