export interface ExcelReportsDTO {
    startDate: Date;  
    endDate: Date;    
}

export interface GetReportData{
    id: number;
    itemID: number;
    itemName: string;
    actionType: string;
    actionDate: string;
    branchOfficeId: number;
    branchName: string;
    oldQuantity: string;
    newQuantity: number;
    userId: number;
    userName: string;
}