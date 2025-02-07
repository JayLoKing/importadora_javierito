export interface NewItemDTO {
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
    barcodes?: string[];
    acronym: string;
}


export interface Item {
    itemID: number;
    name: string;
    description: string;
    model: string;
    price: number;
    wholesalePrice: number;
    barePrice: number;
    brand: string;
    category: string;
    subCategory: string;
    dateManufacture: string;
    itemImage: string;
    address: string;
    totalStock: number;
}

export interface ItemById{
    itemID: number;
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
    itemImages: string[];
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
