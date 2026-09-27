import * as XLSX from 'xlsx';
import path from 'path'

export function readExcel(filePath: string, sheetName: string): any[] {
    const fullPath = path.resolve(filePath);
    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    return data;
}