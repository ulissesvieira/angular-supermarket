export class PaginationSettings {
   constructor(public currentPage: string,
      public itemsPerPage?: string) {
      this.itemsPerPage = '5';
   }
}
