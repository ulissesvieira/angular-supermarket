import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@Component({
   selector: 'app-general-search-dialog',
   templateUrl: './general-search-dialog.component.html',
   styleUrls: ['./general-search-dialog.component.css']
})
export class GeneralSearchDialogComponent implements OnInit {
   dialogResult: any;

   constructor(private dialog: MatDialog) { }

   ngOnInit() {
   }

   openDialog() {
      const dialogRef = this.dialog.open(SearchDialogComponent, {
         width: '800px',
         height: '400px',
         data: '',
      });

      dialogRef.afterClosed().subscribe(
         result => {
            console.log(`Dialog closed: ${result}`);
            this.dialogResult = result;
         }
      );
   }
}
