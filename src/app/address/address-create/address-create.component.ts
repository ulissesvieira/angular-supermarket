import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AddressService } from '../address.service';
import { Address } from '../address.class';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
   selector: 'app-address-create',
   templateUrl: './address-create.component.html',
   styleUrls: ['./address-create.component.css']
})
export class AddressCreateComponent implements OnInit, OnDestroy {
   addressForm: FormGroup;

   private addressId: number;
   private errors: any;
   private sub: Subscription;

   constructor(private formBuilder: FormBuilder,
               private addressService: AddressService,
               private router: Router,
               private route: ActivatedRoute) { }

   ngOnInit() {
      this.sub = this.route.params.subscribe(
         params => this.addressId = Number(params['id'])
      );

      this.createForm();

      if (!this.addressId) {
         const nexId = this.addressService.getLastId();
         this.addressForm.patchValue({
            id: Number(nexId),
         });
      } else {
         this.addressService.findById(this.addressId).subscribe(
            addr => {
               if (addr.id > 0) {
                  this.addressForm.setValue({
                     id: Number(addr.id),
                     street: addr.street,
                     rsNumber: addr.rsNumber,
                     city: addr.city,
                     state: addr.state,
                     zip: addr.zip
                  });
               } else {
                  this.handleErrors('Address ' + this.addressId + ' not found!');
                  this.redirectListingPage();
               }
            },
            error => this.handleErrors(error),
         );
      }
   }

   ngOnDestroy() {
      this.sub.unsubscribe();
   }

   createForm() {
      this.addressForm = this.formBuilder.group({
         id: ['', Validators.required],
         street: ['', [Validators.required, Validators.minLength(3)]],
         rsNumber: ['', Validators.required],
         city: '',
         state: '',
         zip: ['', Validators.required]
      });
   }

   onSubmit() {
      if (this.addressForm.valid) {
         const addressModel = this.getModel();

         if (this.addressId) {
            this.addressService.updateAddress(addressModel).subscribe(
               cli => {
                  this.updateModel(cli);
                  this.redirectListingPage();
               },
               error => this.handleErrors(error),
            );
         } else {
            this.addressService.saveAddress(addressModel).subscribe(
               cli => {
                  this.updateModel(cli);
                  this.redirectListingPage();
               },
               error => this.handleErrors(error),
            );
         }
      }
   }

   getModel(): Address {
      const address: Address = new Address(
         this.addressForm.controls['id'].value,
         this.addressForm.controls['street'].value,
         this.addressForm.controls['rsNumber'].value,
         this.addressForm.controls['city'].value,
         this.addressForm.controls['state'].value,
         this.addressForm.controls['zip'].value
      );

      return address;
   }

   updateModel(address: Address) {
      this.addressForm.setValue({
         id: Number(address.id),
         street: address.street,
         rsNumber: address.rsNumber,
         city: address.city,
         state: address.state,
         zip: address.zip
      });
   }

   redirectListingPage() {
      this.router.navigate(['addresses']);
   }

   private handleErrors(errs: any) {
      this.errors = errs;
      console.log(errs);
   }
}
