import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
    HttpModule
  ],
  declarations: [AddressCreateComponent, AddressListComponent]
})
export class AddressModule { }
