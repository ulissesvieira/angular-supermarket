import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GeneralSearchDialogComponent } from './general-search-dialog.component';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { PaginationComponent } from '../pagination/pagination.component';

@NgModule({
   imports: [
      CommonModule,
      MatInputModule,
      MatDialogModule,
      MatButtonModule,
      MatFormFieldModule,
      MatCardModule,
      BrowserAnimationsModule
   ],
   declarations: [GeneralSearchDialogComponent, SearchDialogComponent, PaginationComponent],
   entryComponents: [SearchDialogComponent]
})
export class GeneralSearchDialogModule { }
