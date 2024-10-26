export interface Brand {
  id: number;
  name: string;
}

export interface BrandPage {
  data: Brand[],
  totalElements: number,
  totalPages: number,
  pageSize: number,
  pageNumber: number,
  numberOfElements: number
}
