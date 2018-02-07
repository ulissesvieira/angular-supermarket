import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Address } from './address.class';
import { SpringRouting } from '../utils/spring-routing.class';
import { PaginationSettings, PaginationResult } from '../dialogs/pagination/pagination.module';

@Injectable()
export class AddressService {
   private FIRST_ID = 0;
   private errorAddress = new Address(-1, 'ADDRESS_ERROR', null, null, null, null);

   constructor(private http: HttpClient) { }

   getAllAddresses(): Observable<Address[]> {
      return this.http.get(SpringRouting.ADDRESS_LISTING)
                      .catch(this.handleErrors);
   }

   search(settings: PaginationSettings): Observable<PaginationResult> {
      const params = this.setParams(settings);

      return this.http.get(SpringRouting.ADDRESS_SEARCH, {params: params})
                      .catch(this.handleErrors);
   }

   saveAddress(address: Address): Observable<Address> {
      return this.http.post(SpringRouting.ADDRESS_SAVE, address)
                      .catch(this.handleErrors);
   }

   findById(id: number): Observable<Address> {
      const address: Observable<Address> =
             this.http.get(SpringRouting.ADDRESS_FIND_BY_ID + id)
                      .catch(this.handleErrors);

      if (address == null) {
         return of(this.errorAddress);
      }

      return address;
   }

   getLastId(): number {
      return this.FIRST_ID;
   }

   updateAddress(address: Address): Observable<Address> {
      return this.http.put(SpringRouting.ADDRESS_UPDATE, address)
                      .catch(this.handleErrors);
   }

   deleteAddress(address: Address): Observable<Boolean> {
      return this.http.delete(SpringRouting.ADDRESS_DELETE + address.id)
                      .catch(this.handleErrors);
   }

   private setParams(parameters): HttpParams {
      const params = new HttpParams();
      const keys = Object.keys(parameters);

      keys.forEach( (key) => {
          params.append(key, parameters[key].toString());
      });

      return params;
  }

   handleErrors(errors: any): Observable<any> {
      console.log(errors);
      return Observable.throw(errors || 'Server error');
   }
}
