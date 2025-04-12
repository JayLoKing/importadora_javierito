export interface NewStockDTO {
    itemId?: number;
    branchOfficeId: number;
    quantity: number;
    acronym?: string;
    barcodes?: string[];
}