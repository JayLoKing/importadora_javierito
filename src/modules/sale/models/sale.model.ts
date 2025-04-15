import { SaleDetailsDto } from "./saleDetails.model";

export interface SaleDto {
    total: number;
    employeeId: number;
    clientId: number;
    commission: number;
    discount: number;
    details: SaleDetailsDto[];
}