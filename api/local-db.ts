import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(table: string): string {
  return path.join(DATA_DIR, `${table}.json`);
}

function readTable(table: string): any[] {
  const filePath = getFilePath(table);
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return [];
  }
}

function writeTable(table: string, data: any[]): void {
  fs.writeFileSync(getFilePath(table), JSON.stringify(data, null, 2), 'utf-8');
}

// Table names (same as dynamodb.ts)
export const TABLES = {
  CONTENT: 'content',
  COURSES: 'courses',
  NEWS: 'news',
  DOWNLOADS: 'downloads',
  CERTIFICATES: 'certificates',
  RECRUITMENT: 'recruitment',
};

export async function putItem(table: string, item: Record<string, any>) {
  const data = readTable(table);
  const idx = data.findIndex((d: any) => d.id === item.id);
  if (idx >= 0) {
    data[idx] = item;
  } else {
    data.push(item);
  }
  writeTable(table, data);
}

export async function getItem(table: string, key: Record<string, any>) {
  const data = readTable(table);
  return data.find((d: any) => d.id === key.id);
}

export async function scanItems(table: string, filterExpression?: string, expressionValues?: Record<string, any>) {
  const data = readTable(table);
  if (!filterExpression || !expressionValues) return data;

  // Simple filter support for common patterns
  return data.filter((item: any) => {
    // Handle '#s = :section' or '#t = :type' or 'category = :cat'
    for (const [exprKey, exprValue] of Object.entries(expressionValues)) {
      // Find the field being filtered
      let field = '';
      if (filterExpression.includes('#s')) field = 'section';
      else if (filterExpression.includes('#t')) field = 'type';
      else if (filterExpression.includes('category')) field = 'category';
      else {
        // Try to extract field name from expression
        const match = filterExpression.match(/(\w+)\s*=/);
        if (match) field = match[1];
      }
      if (field && item[field] !== exprValue) return false;
    }
    return true;
  });
}

export async function updateItem(table: string, key: Record<string, any>, updates: Record<string, any>) {
  const data = readTable(table);
  const idx = data.findIndex((d: any) => d.id === key.id);
  if (idx >= 0) {
    data[idx] = { ...data[idx], ...updates };
    writeTable(table, data);
    return { Attributes: data[idx] };
  }
  // If not found, create it
  const newItem = { ...key, ...updates };
  data.push(newItem);
  writeTable(table, data);
  return { Attributes: newItem };
}

export async function deleteItem(table: string, key: Record<string, any>) {
  const data = readTable(table);
  const filtered = data.filter((d: any) => d.id !== key.id);
  writeTable(table, filtered);
}

export async function queryItems(table: string, _keyCondition: string, expressionValues: Record<string, any>, _indexName?: string) {
  return scanItems(table, _keyCondition, expressionValues);
}
