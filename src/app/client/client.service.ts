import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Client } from './client.class';
import { SpringRouting } from '../utils/spring-routing.class';

@Injectable()
export class ClientService {
   private FIRST_ID = 0;
   private errorClient = new Client(-1, 'CLIENT_ERROR', new Date());

   constructor(private http: HttpClient) { }

   getAllClients(): Observable<Client[]> {
      return this.http.get<Client[]>(SpringRouting.CLIENT_LISTING)
                      .catch(this.handleErrors);
   }

   saveClient(client: Client): Observable<Client> {
      return this.http.post<Client>(SpringRouting.CLIENT_SAVE, client)
                      .catch(this.handleErrors);
   }

   findById(id: number): Observable<Client> {
      const client: Observable<Client> =
             this.http.get<Client>(SpringRouting.CLIENT_FIND_BY_ID + id)
                      .catch(this.handleErrors);

      if (client == null) {
         return of(this.errorClient);
      }

      return client;
   }

   getLastId(): number {
      return this.FIRST_ID;
   }

   updateClient(client: Client): Observable<Client> {
      return this.http.put<Client>(SpringRouting.CLIENT_UPDATE, client)
                      .catch(this.handleErrors);
   }

   deleteClient(client: Client): Observable<Boolean> {
      return this.http.delete(SpringRouting.CLIENT_DELETE + client.id)
                      .catch(this.handleErrors);
   }

   handleErrors(errors: any): Observable<any> {
      console.log(errors);
      return Observable.throw(errors || 'Server error');
   }
}
