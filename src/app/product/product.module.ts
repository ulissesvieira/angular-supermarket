import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { UtilsModule } from '../utils/utils.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';

@NgModule({
   imports: [
      CommonModule,
      ProductRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      UtilsModule
   ],
   declarations: [ProductListComponent, ProductCreateComponent],
})
export class ProductModule { }
