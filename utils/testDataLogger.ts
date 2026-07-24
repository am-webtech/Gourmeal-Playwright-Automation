import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

const LOG_FILE = path.resolve('Test Data/created_events.xlsx');

export function logCreatedEvent(eventName: string): void {
  const createdAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const newRow = [eventName, createdAt];

  let wb: XLSX.WorkBook;
  let ws: XLSX.WorkSheet;

  if (fs.existsSync(LOG_FILE)) {
    wb = XLSX.readFile(LOG_FILE);
    ws = wb.Sheets['Events'];
  } else {
    wb = XLSX.utils.book_new();
    ws = XLSX.utils.aoa_to_sheet([['Event Name', 'Created At']]);
    XLSX.utils.book_append_sheet(wb, ws, 'Events');
  }

  XLSX.utils.sheet_add_aoa(ws, [newRow], { origin: -1 });
  XLSX.writeFile(wb, LOG_FILE);
}