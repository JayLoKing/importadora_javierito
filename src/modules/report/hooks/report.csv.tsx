/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToCSV = (data: any[], fileName: string) => {
    const filteredData = data.map(({ id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const csvData = XLSX.utils.sheet_to_csv(worksheet); // Convierte a formato CSV
  
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${fileName}.csv`);
  };

