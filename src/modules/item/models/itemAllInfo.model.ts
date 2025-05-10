export interface GetBranchOfficesStock {
    quantity: number;
    branchName: string;
}

export interface GetAllItemInfo {
    itemId: number;
    name: string;
    alias: string;
    description: string;
    model: string;
    price: number;
    wholesalePrice: number;
    barePrice: number;
    purchasePrice: number;
    brandName: string;
    subCategoryName: string;
    dateManufacture: string;
    itemAddressName: string;
    acronym: string;
    itemStatus: string;
    transmission: string;
    cylinderCapacity: string;
    traction: string;
    itemSeries: string;
    fuel: string;
    itemImages: string[];
    totalStock: number;
    branchStocks: GetBranchOfficesStock[];
    registerDate: string;
}