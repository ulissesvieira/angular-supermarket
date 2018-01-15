import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable'
import { of } from 'rxjs/observable/of'

import { Product } from './product.class';
import { PRODUCTS } from './product-mock.class';

@Injectable()
export class ProductService {
   private FIRST_ID : number = 1;
   products = PRODUCTS;

   constructor() { }

   getAllProducts() : Observable<Product[]> {
      return of(this.products);
   }

   saveProduct(product : Product) : Observable<Product> {
      this.products.push(product);

      return of(product);
   }

   findById(id : number) : Observable<Product> {
      for (let i = 0; i < this.products.length; i++) {
         if (this.products[i].id === Number(id))
            return of(this.products[i]);
      }

      return null;
   }

   getLastId() : number {
      let id = this.FIRST_ID;
      if (this.products.length && this.products.length > 0) {
         id = this.products[this.products.length - 1].id + 1;
      }

      return id;
   }

   updateProduct(product : Product) : Observable<Product> {
      for (let i = 0; i < this.products.length; i++) {
         if (this.products[i].id === Number(product.id)) {
            this.products[i].sku = product.sku;
            this.products[i].description = product.description;

            return of(this.products[i]);
         }
      }

      return null;
   }

   deleteProduct(product : Product) : Observable<Product[]> {
      let prods = this.products.filter(prod => product.id != prod.id);
      this.products = prods;

      return of (this.products);
   }
}
