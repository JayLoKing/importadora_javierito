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
    dateManufacture: string;
    itemAddressID: number;
    userID?: number;
    purchasePrice: number;
    pathItems: string[] ;

    itemStatus?: string;
    transmission?: string;
    cylinderCapacity?: string;
    traction?: string;
    itemSeries?: string;
    fuel: string;

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
    registerDate: string;
}

export interface GetItems {
    data: Item[];
    total: number;
}

export interface ItemById{
    itemID: number;
    name: string;
    alias: string;
    description: string;
    model: string;
    price: number;
    wholesalePrice: number;
    purchasePrice: number;
    barePrice: number;
    brandID: number;
    subCategoryID: number;
    dateManufacture: string;
    itemAddressID: number;
    userID: number;
    acronym: string;
    itemImages: string[];

    itemStatus?: string;
    transmission?: string;
    cylinderCapacity?: string;
    traction?: string;
    itemSeries?: string;
    fuel: string;
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

export interface ItemAcronym {
    id?: number;
    acronym: string;
}