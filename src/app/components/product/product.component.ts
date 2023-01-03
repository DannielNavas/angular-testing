import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
})
export class ProductComponent {
  @Input() product: Product = {
    id: '1',
    title: 'title exaple',
    price: 1000,
    images: [''],
    description: 'Description example',
    category: {
      id: 1,
      name: 'category example',
    },
  };
}
