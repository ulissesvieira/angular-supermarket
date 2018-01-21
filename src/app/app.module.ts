import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { ClientModule } from './client/client.module';
import { ClientService } from './client/client.service';

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
   providers: [ProductService, ClientService],
   bootstrap: [AppComponent]
})
export class AppModule { }
