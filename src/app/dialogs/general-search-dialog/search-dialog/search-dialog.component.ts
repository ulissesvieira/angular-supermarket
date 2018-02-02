import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PaginationResult } from '../../pagination/pagination-result.class';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
   selector: 'app-search-dialog',
   templateUrl: './search-dialog.component.html',
   styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {
   private selectedObject: any;

   constructor(private dialogRef: MatDialogRef<SearchDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: any) { }

   ngOnInit() {
   }

   onCloseConfirm() {
      if (this.selectedObject) {
         this.dialogRef.close(this.selectedObject);
         return;
      }

      this.dialogRef.close('Confirm');
   }

   onCloseCancel() {
      this.dialogRef.close('Cancel');
   }

   getSelectedObject(event) {
      this.selectedObject = event;
      this.onCloseConfirm();
   }
}
