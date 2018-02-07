import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UtilsModule } from '../utils/utils.module';

import { AddressRoutingModule } from './address-routing.module';
import { AddressCreateComponent } from './address-create/address-create.component';
import { AddressListComponent } from './address-list/address-list.component';

@NgModule({
  imports: [
    CommonModule,
    AddressRoutingModule,
    UtilsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [AddressCreateComponent, AddressListComponent],
})
export class AddressModule { }
