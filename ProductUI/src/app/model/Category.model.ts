export interface Category{
    id:number;
    name:string;
}

export interface CategoryPage{
     data: Category[],
     totalElements: number,
     totalPages: number,
     pageSize: number,
     pageNumber: number,
     numberOfElements: number
}