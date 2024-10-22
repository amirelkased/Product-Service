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

export interface NewProduct {
    title: string,
    description: string,
    price: number,
    imageUrl: string,
    category: string,
    brand: string,
    stock: number
}