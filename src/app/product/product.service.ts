import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

import { Product } from './product.class';
import { PRODUCTS } from './product-mock.class';

@Injectable()
export class ProductService {
   private FIRST_ID = 1;
   products = PRODUCTS;
   private errorProduct = new Product(-1, 'SKU_ERROR', 'Error');

   constructor() { }

   getAllProducts(): Observable<Product[]> {
      return of(this.products);
   }

   saveProduct(product: Product): Observable<Product> {
      this.products.push(product);

      return of(product);
   }

   findById(id: number): Observable<Product> {
      for (let i = 0; i < this.products.length; i++) {
         if (this.products[i].id === id) {
            return of(this.products[i]);
         }
      }

      return of(this.errorProduct);
   }

   getLastId(): number {
      let id = this.FIRST_ID;
      if (this.products.length && this.products.length > 0) {
         id = this.products[this.products.length - 1].id + 1;
      }

      return id;
   }

   updateProduct(product: Product): Observable<Product> {
      for (let i = 0; i < this.products.length; i++) {
         if (this.products[i].id === product.id) {
            this.products[i].sku = product.sku;
            this.products[i].description = product.description;

            return of(this.products[i]);
         }
      }

      return of(this.errorProduct);
   }

   deleteProduct(product: Product): Observable<Product[]> {
      const prods = this.products.filter(prod => product.id !== prod.id);
      this.products = prods;

      return of(this.products);
   }
}
