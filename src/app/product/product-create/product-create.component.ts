import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product.class';

@Component({
   selector: 'app-product-create',
   templateUrl: './product-create.component.html',
   styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
   productForm: FormGroup;
   private productId : number;
   private errors : any;
   private sub : any;

   constructor(private formBuilder : FormBuilder,
               private productService : ProductService,
               private router : Router,
               private route : ActivatedRoute) { }

   ngOnInit() {
      this.sub = this.route.params.subscribe(params => this.productId = params['id']);

      this.createForm();

      if (!this.productId) {
         let nextId = this.productService.getLastId();
         this.productForm.patchValue({
            id : nextId,
         });
      }
      else {
         this.productService.findById(this.productId).subscribe(prod => {
            this.productForm.setValue({
               id : prod.id,
               sku : prod.sku,
               description : prod.description,
            });
         },
         error => {
            this.errors = error;
            console.log(error);
         },);
      }
   }

   ngOnDestroy() {
      this.sub.unsubscribe();
   }

   createForm() : void {
      this.productForm = this.formBuilder.group({
         id : ['', Validators.required],
         sku : ['', Validators.required],
         description : ['', Validators.required]
      });
   }

   onSubmit() : void {
      if (this.productForm.valid) {
         let prod = this.getModelProduct();

         if (this.productId) {
            this.productService.updateProduct(prod).subscribe(
               prod =>{
                  this.updateModelProduct(prod);
                  this.redirectListingPage();
               } ,
               error => {
                  this.errors = error;
                  console.log(error);
               },
            );
         }
         else {
            this.productService.saveProduct(prod).subscribe(
               prod =>{
                  this.updateModelProduct(prod);
                  this.redirectListingPage();
               } ,
               error => {
                  this.errors = error;
                  console.log(error);
               },
            );
         }
      }
   }

   getModelProduct() : Product {
      let prod : Product = new Product(
         this.productForm.controls['id'].value,
         this.productForm.controls['sku'].value,
         this.productForm.controls['description'].value,
      );

      return prod;
   }

   updateModelProduct(prod : Product) : void {
      this.productForm.setValue({
         id : prod.id,
         sku : prod.sku,
         description : prod.description,
      });
   }

   redirectListingPage() : void {
      this.router.navigate(['/products']);
   }
}
