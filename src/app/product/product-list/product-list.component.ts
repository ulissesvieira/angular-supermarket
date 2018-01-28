import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product.class';

@Component({
   selector: 'app-product-list',
   templateUrl: './product-list.component.html',
   styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
   products: Product[];

   constructor(private productService: ProductService,
      private router: Router) { }

   ngOnInit() {
      this.getAllProducts();
   }

   getAllProducts() {
      this.productService.getAllProducts().subscribe(
         prods => {
            this.products = prods;
         },
         err => this.handleErrors(err),
      );
   }

   editProductPage(prod: Product) {
      this.router.navigate(['product/edit', prod.id]);
   }

   deleteProductPage(prod: Product) {
      this.productService.deleteProduct(prod).subscribe(
         res => {
            if (res) {
               this.getAllProducts();
            }
         },
         err => this.handleErrors(err),
      );
   }

   redirectNewProductPage() {
      this.router.navigate(['product/create']);
   }

   handleErrors(errs: any) {
      console.log(errs);
   }
}
