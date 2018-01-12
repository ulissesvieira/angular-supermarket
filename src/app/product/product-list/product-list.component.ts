import { Product } from './../product.class';
import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { Product } from '../product.class';

@Component({
   selector: 'app-product-list',
   templateUrl: './product-list.component.html',
   styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
   products : Product[];

   constructor(private productService : ProductService) { }

   ngOnInit() {
      this.getAllProducts();
   }

   getAllProducts() {
      this.productService.getAllProducts().subscribe(
         prods => {
            this.products = prods;
         },
         err => {
            console.log(err);
          }
      );
   }

   editProductPage(prod : Product) {

   }

   deleteProductPage(prod : Product) {

   }

   redirectNewProductPage() {

   }
}
