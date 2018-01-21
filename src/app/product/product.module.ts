import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ExtendedInputComponent } from '../utils/extended-input/extended-input.component';

@NgModule({
   imports: [
      CommonModule,
      ProductRoutingModule,
      ReactiveFormsModule,
      HttpModule,
   ],
   declarations: [ProductListComponent, ProductCreateComponent, ExtendedInputComponent],
})
export class ProductModule { }
