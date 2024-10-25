export class Product {
    constructor(
        public sku: string,
        public title: string,
        public description: string,
        public price: number,
        public imageUrl: string,
        public category: string,
        public brand: string,
        public inventoryStatus: string,
        public stock: number
    ) { }
}

export class ProductForm {
    constructor(
        public title: string,
        public description: string,
        public price: number,
        public imageUrl: string,
        public category: string,
        public brand: string
    ) {
        
    }
}

export interface FullFormProduct{
    brand : {
        id:number,
        name:string
    },
    category:{
        id:number,
        name:string
    },
    createdAt:string,
    description:string,
    id:number,
    imageUrl:string,
    lastModifiedAt:string,
    price:number,
    sku:string,
    status:string,
    title:string
}