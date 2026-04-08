import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const REGION = process.env.AWS_REGION || 'ap-northeast-1';

const client = new DynamoDBClient({ region: REGION });
export const docClient = DynamoDBDocumentClient.from(client);

// Table names
export const TABLES = {
  CONTENT: process.env.CONTENT_TABLE || 'magpiecert-content',
  COURSES: process.env.COURSES_TABLE || 'magpiecert-courses',
  NEWS: process.env.NEWS_TABLE || 'magpiecert-news',
  DOWNLOADS: process.env.DOWNLOADS_TABLE || 'magpiecert-downloads',
  CERTIFICATES: process.env.CERTIFICATES_TABLE || 'magpiecert-certificates',
  RECRUITMENT: process.env.RECRUITMENT_TABLE || 'magpiecert-recruitment',
};

// Generic CRUD helpers
export async function putItem(table: string, item: Record<string, any>) {
  return docClient.send(new PutCommand({ TableName: table, Item: item }));
}

export async function getItem(table: string, key: Record<string, any>) {
  const res = await docClient.send(new GetCommand({ TableName: table, Key: key }));
  return res.Item;
}

export async function queryItems(table: string, keyCondition: string, expressionValues: Record<string, any>, indexName?: string) {
  const params: any = {
    TableName: table,
    KeyConditionExpression: keyCondition,
    ExpressionAttributeValues: expressionValues,
  };
  if (indexName) params.IndexName = indexName;
  const res = await docClient.send(new QueryCommand(params));
  return res.Items || [];
}

export async function scanItems(table: string, filterExpression?: string, expressionValues?: Record<string, any>) {
  const params: any = { TableName: table };
  if (filterExpression) {
    params.FilterExpression = filterExpression;
    params.ExpressionAttributeValues = expressionValues;
  }
  const res = await docClient.send(new ScanCommand(params));
  return res.Items || [];
}

export async function updateItem(table: string, key: Record<string, any>, updates: Record<string, any>) {
  const updateParts: string[] = [];
  const exprValues: Record<string, any> = {};
  const exprNames: Record<string, string> = {};

  Object.entries(updates).forEach(([field, value], i) => {
    const attrName = `#f${i}`;
    const attrValue = `:v${i}`;
    exprNames[attrName] = field;
    exprValues[attrValue] = value;
    updateParts.push(`${attrName} = ${attrValue}`);
  });

  return docClient.send(new UpdateCommand({
    TableName: table,
    Key: key,
    UpdateExpression: `SET ${updateParts.join(', ')}`,
    ExpressionAttributeNames: exprNames,
    ExpressionAttributeValues: exprValues,
    ReturnValues: 'ALL_NEW',
  }));
}

export async function deleteItem(table: string, key: Record<string, any>) {
  return docClient.send(new DeleteCommand({ TableName: table, Key: key }));
}
