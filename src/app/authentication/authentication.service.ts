import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Login } from './login.class';
import { SpringRouting } from '../utils/spring-routing.class';

@Injectable()
export class AuthenticationService {

   constructor(private router: Router,
      private http: HttpClient) { }

   obtainAccessToken(login: Login) {
      let params = new HttpParams();
      params = params.append('username', login.username);
      params = params.append('password', login.password);
      params = params.append('grant_type', 'password');
      params = params.append('client_id', 'my-trusted-client');

      const headers = new HttpHeaders({
         'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
         'Authorization': 'Basic ' + btoa('my-trusted-client:secret')
      });
      const options = { headers: headers };
      console.log(params);

      this.http.post(SpringRouting.OAUTH_TOKEN, params.toString(), options)
               .subscribe(
                  data => {
                     this.saveToken(data);
                     this.checkCredencials();
                  },
                  err => console.log(err)
               );
   }

   saveToken(token) {
      const expireDate = new Date().getTime() + (1000 * token.expires_in);
      Cookie.set('access_token', token.access_token, expireDate);
      Cookie.set('refresh_token', token.refresh_token, expireDate);

      console.log('Obtained Access Token');
   }

   getToken(): string {
      return Cookie.get('access_token');
   }

   refreshToken(): Observable<string> {
      let params = new HttpParams();
      params = params.append('refresh_token', Cookie.get('refresh_token'));
      params = params.append('grant_type', 'refresh_token');
      params = params.append('client_id', 'my-trusted-client');

      const headers = new HttpHeaders({
         'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
         'Authorization': 'Basic ' + btoa('my-trusted-client:secret')
      });
      const options = { headers: headers };
      console.log(params);

      this.http.post(SpringRouting.OAUTH_TOKEN, params.toString(), options)
               .subscribe(
                  data => {
                     this.saveToken(data);
                     return of(this.getToken());
                  },
                  err => console.log(err)
               );

      return null;
   }

   checkCredencials() {
      if (Cookie.check('access_token')) {
         this.router.navigate(['/']);
      } else {
         this.logout();
      }
   }

   logout() {
      Cookie.delete('access_token');
      this.router.navigate(['/login']);
   }
}
