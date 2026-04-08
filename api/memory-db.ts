import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

function loadJson(name: string): any[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${name}.json`), 'utf-8'));
  } catch {
    return [];
  }
}

// In-memory storage — loaded once at cold start from JSON seed data
const store: Record<string, any[]> = {
  content: loadJson('content'),
  courses: loadJson('courses'),
  news: loadJson('news'),
  downloads: loadJson('downloads'),
  certificates: loadJson('certificates'),
  recruitment: loadJson('recruitment'),
};

export const TABLES = {
  CONTENT: 'content',
  COURSES: 'courses',
  NEWS: 'news',
  DOWNLOADS: 'downloads',
  CERTIFICATES: 'certificates',
  RECRUITMENT: 'recruitment',
};

export async function putItem(table: string, item: Record<string, any>) {
  if (!store[table]) store[table] = [];
  const idx = store[table].findIndex((d: any) => d.id === item.id);
  if (idx >= 0) {
    store[table][idx] = item;
  } else {
    store[table].push(item);
  }
}

export async function getItem(table: string, key: Record<string, any>) {
  if (!store[table]) return undefined;
  return store[table].find((d: any) => d.id === key.id);
}

export async function scanItems(table: string, filterExpression?: string, expressionValues?: Record<string, any>) {
  const data = store[table] || [];
  if (!filterExpression || !expressionValues) return data;

  return data.filter((item: any) => {
    for (const [_exprKey, exprValue] of Object.entries(expressionValues)) {
      let field = '';
      if (filterExpression.includes('#s')) field = 'section';
      else if (filterExpression.includes('#t')) field = 'type';
      else if (filterExpression.includes('category')) field = 'category';
      else {
        const match = filterExpression.match(/(\w+)\s*=/);
        if (match) field = match[1];
      }
      if (field && item[field] !== exprValue) return false;
    }
    return true;
  });
}

export async function updateItem(table: string, key: Record<string, any>, updates: Record<string, any>) {
  if (!store[table]) store[table] = [];
  const idx = store[table].findIndex((d: any) => d.id === key.id);
  if (idx >= 0) {
    store[table][idx] = { ...store[table][idx], ...updates };
    return { Attributes: store[table][idx] };
  }
  const newItem = { ...key, ...updates };
  store[table].push(newItem);
  return { Attributes: newItem };
}

export async function deleteItem(table: string, key: Record<string, any>) {
  if (!store[table]) return;
  store[table] = store[table].filter((d: any) => d.id !== key.id);
}

export async function queryItems(table: string, _keyCondition: string, expressionValues: Record<string, any>, _indexName?: string) {
  return scanItems(table, _keyCondition, expressionValues);
}
