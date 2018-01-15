import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ProductModule,
   ],
   providers: [ProductService],
   bootstrap: [AppComponent]
})
export class AppModule { }
