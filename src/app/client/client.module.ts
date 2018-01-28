import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UtilsModule } from '../utils/utils.module';
import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientCreateComponent } from './client-create/client-create.component';

@NgModule({
   imports: [
      CommonModule,
      ClientRoutingModule,
      ReactiveFormsModule,
      HttpModule,
      UtilsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatInputModule,
      BrowserAnimationsModule
   ],
   declarations: [ClientListComponent, ClientCreateComponent]
})
export class ClientModule { }
