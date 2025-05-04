import { httpClient } from "../../../api/httpClient";
import { ExcelReportsDTO } from "../models/report.model";

export async function getExcelAsync(excelReports: ExcelReportsDTO){
    try {
        const res = await httpClient.post("/itemAudits/excelReports", excelReports);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        
        throw error;
    }
}
