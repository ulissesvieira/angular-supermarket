import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtendedInputComponent } from './extended-input/extended-input.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ExtendedInputComponent],
  exports: [ExtendedInputComponent]
})
export class UtilsModule { }
