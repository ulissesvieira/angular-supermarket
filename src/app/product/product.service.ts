import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product } from './product.class';
import { SpringRouting } from '../utils/spring-routing.class';

@Injectable()
export class ProductService {
   private FIRST_ID = 0;
   private errorProduct = new Product(-1, 'SKU_ERROR', 'Error');

   constructor(private http: HttpClient) { }

   getAllProducts(): Observable<Product[]> {
      return this.http.get(SpringRouting.PRODUCT_LISTING)
                      .catch(this.handleErrors);
   }

   saveProduct(product: Product): Observable<Product> {
      return this.http.post(SpringRouting.PRODUCT_SAVE, product)
                      .catch(this.handleErrors);
   }

   findById(id: number): Observable<Product> {
      const prod: Observable<Product> =
             this.http.get(SpringRouting.PRODUCT_FIND_BY_ID + id)
                      .catch(this.handleErrors);

      if (prod == null) {
         return of(this.errorProduct);
      }

      return prod;
   }

   getLastId(): number {
      return this.FIRST_ID;
   }

   updateProduct(product: Product): Observable<Product> {
      return this.http.put(SpringRouting.PRODUCT_UPDATE, product)
                      .catch(this.handleErrors);
   }

   deleteProduct(product: Product): Observable<Boolean> {
      return this.http.delete(SpringRouting.PRODUCT_DELETE + product.id)
                      .catch(this.handleErrors);
   }

   handleErrors(errors: any): Observable<any> {
      console.log(errors);
      return Observable.throw(errors || 'Server error');
   }
}
