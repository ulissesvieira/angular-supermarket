import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse } from '@angular/common/http';
import { HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
   private authenticationService: AuthenticationService;
   private isRefreshingToken = false;
   tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

   constructor(private injector: Injector) { }

   addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
      let isNotRefreshReq = true;
      if (req.body) {
         isNotRefreshReq = req.body.toString().indexOf('refresh_token') === -1;
      }

      if (token && isNotRefreshReq) {
         return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      }

      return req;
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

      this.authenticationService = this.injector.get(AuthenticationService);

      const request = this.addToken(req, this.authenticationService.getToken());
      return next.handle(request)
         .catch(
            error => {
               if (error instanceof HttpErrorResponse) {
                  switch ((<HttpErrorResponse>error).status) {
                     case 400:
                        this.handle400Error(error);
                        break;
                     case 401:
                        this.handle401Error(req, next);
                        break;
                     case 419:
                        this.handle419Error(req, next);
                        break;
                  }
               } else {
                  return Observable.throw(error);
               }
            }
         );
   }

   handle400Error(error) {
      if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
         // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
         return this.logoutUser();
      }

      return Observable.throw(error);
   }

   handle401Error(req: HttpRequest<any>, next: HttpHandler) {
      if (!this.isRefreshingToken) {
         this.handle419Error(req, next);
      } else {
         return this.tokenSubject
                     .filter(token => token != null)
                     .take(1)
                     .switchMap(token => {
                                    return next.handle(this.addToken(req, token));
                               });
      }
   }

   handle419Error(req: HttpRequest<any>, next: HttpHandler) {
      this.isRefreshingToken = true;
      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authenticationService.refreshToken()
         .finally(() => {
            this.isRefreshingToken = false;
         })
         .subscribe(
            (newToken: string) => {
               if (newToken && newToken.length !== 0) {
                  this.tokenSubject.next(newToken);
                  return next.handle(this.addToken(req, newToken));
               } else {
                  this.logoutUser();
               }
            },
            errs => {
               this.logoutUser();
               return Observable.throw(errs.json().error || 'Refresh Token error');
            },
         );
   }

   logoutUser() {
      return this.authenticationService.logout();
   }
}
