import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../product.service';
import { Product } from '../product.class';

@Component({
   selector: 'app-product-create',
   templateUrl: './product-create.component.html',
   styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
   productForm: FormGroup;
   titleAlert: string;
   private productId: number;
   private errors: any;
   private sub: Subscription;

   constructor(private formBuilder: FormBuilder,
               private productService: ProductService,
               private router: Router,
               private route: ActivatedRoute) { }

   ngOnInit() {
      this.sub = this.route.params.subscribe(
         params => this.productId = Number(params['id'])
      );

      this.createForm();

      if (!this.productId) {
         const nextId = this.productService.getLastId();
         this.productForm.patchValue({
            id : Number(nextId),
         });
      } else {
         this.productService.findById(this.productId).subscribe(
            prod => {
               if (prod.id > 0) {
                  this.productForm.setValue({
                     id : Number(prod.id),
                     sku : prod.sku,
                     description : prod.description,
                  });
               } else {
                  this.handleErrors('Product ' + this.productId + ' not found!');
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

   createForm(): void {
      this.productForm = this.formBuilder.group({
         id : ['', Validators.required],
         sku : ['', [Validators.required, Validators.minLength(3)]],
         description : ['', [Validators.required, Validators.minLength(3)]],
      });
   }

   onSubmit(): void {
      if (this.productForm.valid) {
         const prod = this.getModelProduct();

         if (this.productId) {
            this.productService.updateProduct(prod).subscribe(
               prd => {
                  this.updateModel(prd);
                  this.redirectListingPage();
               } ,
               error => this.handleErrors(error),
            );
         } else {
            this.productService.saveProduct(prod).subscribe(
               prd => {
                  this.updateModel(prd);
                  this.redirectListingPage();
               } ,
               error => this.handleErrors(error),
            );
         }
      }
   }

   getModelProduct(): Product {
      const prod: Product = new Product(
         this.productForm.controls['id'].value,
         this.productForm.controls['sku'].value,
         this.productForm.controls['description'].value,
      );

      return prod;
   }

   updateModel(prod: Product): void {
      this.productForm.setValue({
         id : Number(prod.id),
         sku : prod.sku,
         description : prod.description,
      });
   }

   redirectListingPage(): void {
      this.router.navigate(['products']);
   }

   private handleErrors(errs: any): void {
      this.errors = errs;
      console.log(errs);
   }
}
