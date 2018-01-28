import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressListComponent } from './address-list/address-list.component';
import { AddressCreateComponent } from './address-create/address-create.component';

const routes: Routes = [
   {path: 'addresses', children: [
      {path: '', component: AddressListComponent, pathMatch: 'full'}
   ]},
   {path: 'address/create', component: AddressCreateComponent},
   {path: 'address/edit/:id', component: AddressCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
