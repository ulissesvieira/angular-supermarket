export class Product {
   id: number;
   sku: string;
   description: string;

   constructor(id: number, sku: string, description: string) {
      this.id = id;
      this.sku = sku;
      this.description = description;
   }
}
