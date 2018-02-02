import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PaginationResult } from '../../pagination/pagination-result.class';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
   selector: 'app-search-dialog',
   templateUrl: './search-dialog.component.html',
   styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {
   @ViewChild(PaginationComponent) pagination: PaginationComponent;

   constructor(private dialogRef: MatDialogRef<SearchDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: any) { }

   ngOnInit() {
   }

   onCloseConfirm() {
      this.dialogRef.close('Confirm');
   }

   onCloseCancel() {
      this.dialogRef.close('Cancel');
   }
}
