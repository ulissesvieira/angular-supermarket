import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AddressService } from '../address.service';
import { Address } from '../address.class';

@Component({
   selector: 'app-address-list',
   templateUrl: './address-list.component.html',
   styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
   addresses: Address[] = [];

   constructor(private addressService: AddressService,
               private router: Router) { }

   ngOnInit() {
      this.getAllAddresses();
   }

   getAllAddresses() {
      this.addressService.getAllAddresses().subscribe(
         res => {
            this.addresses = res;
         },
         err => this.handleErrors(err),
      );
   }

   editAddressPage(address: Address) {
      this.router.navigate(['address/edit', address.id]);
   }

   deleteAddressPage(address: Address) {
      this.addressService.deleteAddress(address).subscribe(
         res => {
            if (res) {
               this.getAllAddresses();
            }
         },
         err => this.handleErrors(err),
      );
   }

   redirectNewAddressPage() {
      this.router.navigate(['address/create']);
   }

   handleErrors(errs: any) {
      console.log(errs);
   }
}
