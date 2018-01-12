import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {} from './product/product.module'

const routes: Routes = [
   {path : '', redirectTo : '/products', pathMatch : "full"},
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
