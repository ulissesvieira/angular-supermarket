import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationSettings } from './pagination-settings.class';
import { PaginationResult } from './pagination-result.class';

@NgModule({
   imports: [
      CommonModule,
   ],
   declarations: [
      PaginationSettings,
      PaginationResult
   ],
   exports: [
      PaginationSettings,
      PaginationResult
   ]
})
export class PaginationModule { }

export { PaginationSettings } from './pagination-settings.class';
export { PaginationResult } from './pagination-result.class';
