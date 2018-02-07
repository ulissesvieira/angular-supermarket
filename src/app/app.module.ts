import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DateAdapter } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { DateFormat } from './utils/date-format';

import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { ClientModule } from './client/client.module';
import { ClientService } from './client/client.service';
import { AddressModule } from './address/address.module';
import { AddressService } from './address/address.service';

import { RequestInterceptor } from './authentication/request-interceptor';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';

import { GeneralSearchDialogModule } from './dialogs/general-search-dialog/general-search-dialog.module';

@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ProductModule,
      ClientModule,
      AddressModule,
      GeneralSearchDialogModule,
      HttpClientModule,
      HttpModule,
      AuthenticationModule
   ],
   providers: [ProductService, ClientService, AddressService, AuthenticationService,
      {provide: DateAdapter, useClass: DateFormat},
      {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
      ],
   bootstrap: [AppComponent]
})
export class AppModule {
   constructor(private dateAdapter: DateAdapter<Date>) {
      dateAdapter.setLocale('en-in');
   }
}
