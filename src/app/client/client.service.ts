import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Client } from './client.class';
import { SpringRouting } from '../utils/spring-routing.class';

@Injectable()
export class ClientService {
   private FIRST_ID = 0;
   private errorClient = new Client(-1, 'CLIENT_ERROR', new Date());

   constructor(private http: Http) { }

   getAllClients(): Observable<Client[]> {
      return this.http.get(SpringRouting.CLIENT_LISTING)
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   saveClient(client: Client): Observable<Client> {
      return this.http.post(SpringRouting.CLIENT_SAVE, client)
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   findById(id: number): Observable<Client> {
      const client: Observable<Client> =
             this.http.get(SpringRouting.CLIENT_FIND_BY_ID + id)
                      .map((res: Response) => res.json())
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
      return this.http.put(SpringRouting.CLIENT_UPDATE, client)
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   deleteClient(client: Client): Observable<Boolean> {
      return this.http.delete(SpringRouting.CLIENT_DELETE + client.id)
                      .map((res: Response) => res.json())
                      .catch(this.handleErrors);
   }

   handleErrors(errors: any): Observable<Client[]> {
      console.log(errors);
      return Observable.throw(errors.json().error || 'Server error');
   }
}
