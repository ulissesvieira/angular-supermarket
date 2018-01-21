import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';

const routes: Routes = [
   {
      path: 'products', children: [
         { path: '', component: ProductListComponent },
      ]
   },
   { path: 'product/create', component: ProductCreateComponent },
   { path: 'product/edit/:id', component: ProductCreateComponent },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ProductRoutingModule { }
