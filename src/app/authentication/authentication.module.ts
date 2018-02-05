import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UtilsModule } from '../utils/utils.module';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
   imports: [
      CommonModule,
      ReactiveFormsModule,
      HttpModule,
      UtilsModule
   ],
   declarations: [HomeComponent, LoginComponent]
})
export class AuthenticationModule { }
