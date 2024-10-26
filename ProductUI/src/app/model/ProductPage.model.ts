import {Product} from "./Product.model";

export class ProductPage {

  constructor(
    public data: Product[],
    public totalElements: number,
    public totalPages: number,
    public pageSize: number,
    public pageNumber: number,
    public numberOfElements: number
  ) {

  }
}
