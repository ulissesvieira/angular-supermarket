import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';

import { Login } from './login.class';
import { SpringRouting } from '../utils/spring-routing.class';

@Injectable()
export class AuthenticationService {
   private tokenExpiresIn: number;
   private interval: any;

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
      this.tokenExpiresIn = token.expires_in;
      const expireDateAccess: Date = new Date();
      const time = Date.now() + (1000 * this.tokenExpiresIn);
      expireDateAccess.setTime(time);

      const expireDateRefresh: Date = new Date();
      const time2 = Date.now() + (2000 * this.tokenExpiresIn);
      expireDateRefresh.setTime(time2);

      Cookie.set('access_token', token.access_token, expireDateAccess);
      Cookie.set('refresh_token', token.refresh_token, expireDateRefresh);

      /*clearInterval(this.interval);
      this.interval = setInterval(() => { this.refreshToken(); }, 900 * this.tokenExpiresIn);*/
   }

   getToken(): string {
      return Cookie.get('access_token');
   }

   refreshToken(): Observable<string> {
      if (Cookie.check('refresh_token')) {
         let params = new HttpParams();
         params = params.append('refresh_token', Cookie.get('refresh_token'));
         params = params.append('grant_type', 'refresh_token');
         params = params.append('client_id', 'my-trusted-client');

         const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Basic ' + btoa('my-trusted-client:secret')
         });
         const options = { headers: headers };

         return this.http.post(SpringRouting.OAUTH_TOKEN, params.toString(), options)
                  .map(
                     data => {
                        this.saveToken(data);
                        return this.getToken();
                     },
                     err => Observable.throw(err),
                  );
      } else {
         return of('');
      }
   }

   checkCredencials() {
      if (Cookie.check('refresh_token')) {
         this.router.navigate(['/']);
      } else {
         this.logout();
      }
   }

   deleteCookies() {
      Cookie.delete('access_token');
      Cookie.delete('refresh_token');
   }

   logout() {
      this.deleteCookies();
      // clearInterval(this.interval);
      this.router.navigate(['/login']);
   }
}
