import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../service/product.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.sass'],
})
export class OthersComponent implements OnInit {
  color = 'blue';
  text = 'roma';
  products: Product[] = [];
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
}
