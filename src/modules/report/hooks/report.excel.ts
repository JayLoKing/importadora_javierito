import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import XLSXStyle from 'xlsx-js-style';

export const exportToExcel = (data: any[], fileName: string) => {
  const filteredData = data.map(({ id, ...rest }) => rest);

  const worksheet = XLSX.utils.json_to_sheet(filteredData, { skipHeader: true, origin: 'B5',});

  XLSX.utils.sheet_add_aoa(worksheet, [
    ["Importadora Javierito"],
    ["Reporte de Datos Excel"],
    [`Fecha de Creación: ${new Date().toLocaleString()}`],
    [],
    Object.keys(filteredData[1])

  ], { origin: "B1" });

  const range = XLSX.utils.decode_range(worksheet["!ref"] || "");
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 4, c: col });
    if (!worksheet[cellAddress]) continue;
    worksheet[cellAddress].s = {
      fill: { fgColor: { rgb: "f08b33" } }, 
      font: { bold: true, color: { rgb: "FFFFFF" } }, 
      alignment: { horizontal: 'center', vertical: 'center'}
    };
  }

  const workbook = XLSXStyle.utils.book_new();
  XLSXStyle.utils.book_append_sheet(workbook, worksheet, "Reporte");
  const excelBuffer = XLSXStyle.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${fileName}.xlsx`);
};