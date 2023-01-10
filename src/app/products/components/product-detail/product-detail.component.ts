import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from 'src/app/service/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  status: 'loading' | 'init' | 'error' | 'success' = 'init';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.getProductDetail(productId);
      } else {
        this.goToBack();
      }
    });
  }

  private getProductDetail(productId: string) {
    this.status = 'loading';
    this.productsService.getOne(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.status = 'success';
      },
      error: () => {
        this.status = 'error';
        this.goToBack();
      },
    });
  }

  goToBack() {
    this.location.back();
  }
}
