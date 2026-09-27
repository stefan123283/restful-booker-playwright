import path from 'path'
import fs from 'fs'
import { readCSV } from './csvReader';
import { readExcel } from './excelReader';

export function readData(filePath: string, sheetName?: string) {
    const ext = path.extname(filePath).toLocaleLowerCase();
    switch (ext) {
        case ".json": {
            const jsonData = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(jsonData);
        }
        case ".csv": return readCSV(filePath);
        case ".xlsx": return readExcel(filePath, sheetName || "Sheet1");
        default: throw new Error(`Unsupported file type: ${ext}`);
    }
}