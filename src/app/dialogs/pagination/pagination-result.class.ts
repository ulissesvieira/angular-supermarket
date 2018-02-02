export class PaginationResult {
   constructor(public totalItems?: number,
               public currentPage?: number,
               public pageSize?: number,
               public totalPages?: number,
               public startPage?: number,
               public endPage?: number,
               public startIndex?: number,
               public endIndex?: number,
               public pages?: number[],
               public items?: any[]) {
                  this.totalPages = 10;
               }
}
