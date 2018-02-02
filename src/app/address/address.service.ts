import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Address } from './address.class';
import { SpringRouting } from '../utils/spring-routing.class';
import { PaginationSettings, PaginationResult } from '../dialogs/pagination/pagination.module';

@Injectable()
export class AddressService {
   private FIRST_ID = 0;
   private errorAddress = new Address(-1, 'ADDRESS_ERROR', null, null, null, null);

   constructor(private http: Http) { }

   getAllAddresses(): Observable<Address[]> {
      return this.http.get(SpringRouting.ADDRESS_LISTING)
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   search(settings: PaginationSettings): Observable<PaginationResult> {
      const params = this.setParams(settings);

      return this.http.get(SpringRouting.ADDRESS_SEARCH, {params: params})
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   saveAddress(address: Address): Observable<Address> {
      return this.http.post(SpringRouting.ADDRESS_SAVE, address)
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   findById(id: number): Observable<Address> {
      const address: Observable<Address> =
             this.http.get(SpringRouting.ADDRESS_FIND_BY_ID + id)
                      .map((res: Response) => res.json())
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
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   deleteAddress(address: Address): Observable<Boolean> {
      return this.http.delete(SpringRouting.ADDRESS_DELETE + address.id)
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   private setParams(parameters): URLSearchParams {
      const params = new URLSearchParams();
      const keys = Object.keys(parameters);

      keys.forEach( (key) => {
          params.append(key, parameters[key].toString());
      });

      return params;
  }

   handleErrors(errors: any): Observable<Address[]> {
      console.log(errors);
      return Observable.throw(errors.json().error || 'Server error');
   }
}
