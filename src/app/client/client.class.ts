export class Client {
   id: number;
   name: string;
   birthday: Date;

   constructor(id: number, name: string, birthday: Date) {
      this.id = id;
      this.name = name;
      this.birthday = birthday;
   }
}
