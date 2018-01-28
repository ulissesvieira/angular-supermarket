export class Address {
   id: number;
   street: string;
   rsNumber: string;
   city: string;
   state: string;
   zip: string;

   constructor(id: number, street: string, rsNumber: string,
      city: string, state: string, zip: string) {
      this.id = id;
      this.street = street;
      this.rsNumber = rsNumber;
      this.city = city;
      this.state = state;
      this.zip = zip;
   }
}
