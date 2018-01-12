import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';

@NgModule({
   imports: [
      CommonModule,
      ProductRoutingModule
   ],
   declarations: [ProductListComponent, ProductCreateComponent],
})
export class ProductModule { }
