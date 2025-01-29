export interface ItemDTO {
    name: string;
    alias: string;
    description: string;
    model: string;
    price: number;
    wholesalePrice: number;
    barePrice: number;
    brandID: number;
    subCategoryID: number;
    weight: number;
    dateManufacture: string;
    itemAddressID: number;
    userID: number;
    pathItems: string[];
    branchOfficeID: number;
    quantity: number;
    barcodes: string[];
    acronym: string;
}

export interface GetItems {
    name: string;
    description: string;
    price1: number;
    price2: number;
    price3: number;
    stock: number;
    sucursal: string;
}

export interface ItemAddress {
    id: number;
    name: string;
}

export interface Brand{
    id: number;
    name: string;
}

export interface SubCategory {
    id: number;
    name: string;
}