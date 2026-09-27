import fs from 'fs'
import { parse } from 'csv-parse/sync'

export function readCSV(filePath: string): any[] {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });
    return records;
}