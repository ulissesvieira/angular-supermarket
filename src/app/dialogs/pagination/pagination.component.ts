import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PaginationResult } from './pagination-result.class';
import { AddressService } from '../../address/address.service';
import { PaginationSettings } from './pagination-settings.class';

@Component({
   selector: 'app-pagination',
   templateUrl: './pagination.component.html',
   styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
   @Output() selectedObject: EventEmitter<any> = new EventEmitter<any>();
   pager: PaginationResult;
   pagedItems: any[];
   private settings: PaginationSettings;

   constructor(private addressService: AddressService) { }

   ngOnInit() {
      this.pager = new PaginationResult();
      this.setPage(1);
   }

   setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
         return;
      }

      this.settings = new PaginationSettings(page.toString(), this.pager.totalPages.toString());
      // get pager object from service
      this.addressService.search(this.settings).subscribe(
         res => {
            this.pager = res;
            this.pagedItems = res.items;
         },
         errs => {
            console.log(errs);
         }
      );
   }
}
