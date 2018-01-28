import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DateAdapter } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { ClientModule } from './client/client.module';
import { ClientService } from './client/client.service';
import { DateFormat } from './utils/date-format';

@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ProductModule,
      ClientModule,
   ],
   providers: [ProductService, ClientService,
      [
         {provide: DateAdapter, useClass: DateFormat}
      ]],
   bootstrap: [AppComponent]
})
export class AppModule {
   constructor(private dateAdapter: DateAdapter<Date>) {
      dateAdapter.setLocale('en-in');
   }
}
