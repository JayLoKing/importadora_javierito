export interface ExcelReportsDTO {
    startDate: string;  // Formato yyyy-MM-dd
    endDate: string;    // Formato yyyy-MM-dd
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