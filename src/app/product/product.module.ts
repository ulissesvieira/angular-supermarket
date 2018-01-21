import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ExtendedInputComponent } from '../utils/extended-input/extended-input.component';

@NgModule({
   imports: [
      CommonModule,
      ProductRoutingModule,
      ReactiveFormsModule,
      FormsModule,
   ],
   declarations: [ProductListComponent, ProductCreateComponent, ExtendedInputComponent],
})
export class ProductModule { }
