export class PaginationResult {
   constructor(public totalItems?: number,
               public currentPage?: number,
               public pageSize?: number,
               public totalPages?: number,
               public startPage?: number,
               public endPage?: number,
               public pages?: number[],
               public items?: any[]) { }
}
