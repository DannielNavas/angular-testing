import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../service/product.service';
import { ValueService } from '../../service/value.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  rta = '';
  constructor(
    private productsService: ProductsService,
    private valueService: ValueService
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productsService.getAll(this.limit, this.offset).subscribe({
      // nueva forma del subscribe
      next: (products) => {
        this.products = [...this.products, ...products];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: () => {
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 3000);
      },
    });
  }

  async callPromise() {
    const rta = await this.valueService.getPromiseValue();
    this.rta = rta;
  }
}
