import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable'
import { of } from 'rxjs/observable/of'

import { Product } from './product.class';
import { PRODUCTS } from './product-mock.class';

@Injectable()
export class ProductService {
   products = PRODUCTS;

   constructor() { }

   getAllProducts() : Observable<Product[]> {
      return of(this.products);
   }
}
