import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Product } from './product.class';
import { SpringRouting } from '../utils/spring-routing.class';

@Injectable()
export class ProductService {
   private FIRST_ID = 0;
   private errorProduct = new Product(-1, 'SKU_ERROR', 'Error');

   constructor(private http: Http) { }

   getAllProducts(): Observable<Product[]> {
      return this.http.get(SpringRouting.PRODUCT_LISTING)
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   saveProduct(product: Product): Observable<Product> {
      return this.http.post(SpringRouting.PRODUCT_SAVE, product)
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   findById(id: number): Observable<Product> {
      const prod: Observable<Product> =
             this.http.get(SpringRouting.PRODUCT_FIND_BY_ID + id)
                      .map((res: Response) => res.json())
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
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   deleteProduct(product: Product): Observable<Boolean> {
      return this.http.delete(SpringRouting.PRODUCT_DELETE + product.id)
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   handleErrors(errors: any): Observable<Product[]> {
      console.log(errors);
      return Observable.throw(errors.json().error || 'Server error');
   }
}
