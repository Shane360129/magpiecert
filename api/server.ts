import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

// Use memory-db for Vercel, local JSON file DB for local dev, DynamoDB for Lambda
const isVercel = !!process.env.VERCEL;
const isLambda = !!process.env.LAMBDA_TASK_ROOT;
const db = isVercel
  ? await import('./memory-db.js')
  : isLambda
    ? await import('./dynamodb.js')
    : await import('./local-db.js');
const { TABLES, putItem, getItem, scanItems, updateItem, deleteItem } = db;

const app = express();
app.use(cors());
app.use(express.json());

// ========== Health Check ==========
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ========== Auth ==========
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'magpie2025';

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    res.json({ success: true, token, user: { name: '管理員', role: 'admin' } });
  } else {
    res.status(401).json({ success: false, error: '帳號或密碼錯誤' });
  }
});

app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      const [username] = decoded.split(':');
      if (username === ADMIN_USER) {
        return res.json({ valid: true, user: { name: '管理員', role: 'admin' } });
      }
    } catch {}
  }
  res.status(401).json({ valid: false });
});

// ========== Stats ==========
app.get('/api/stats', async (_req, res) => {
  try {
    const [certificates, courses, news, downloads, recruitment] = await Promise.all([
      scanItems(TABLES.CERTIFICATES),
      scanItems(TABLES.COURSES),
      scanItems(TABLES.NEWS),
      scanItems(TABLES.DOWNLOADS),
      scanItems(TABLES.RECRUITMENT),
    ]);
    res.json({
      certificates: certificates.length,
      courses: courses.length,
      news: news.length,
      downloads: downloads.length,
      recruitment: recruitment.length,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ========== Content (Homepage, About) ==========
app.get('/api/content/:section', async (req, res) => {
  try {
    const items = await scanItems(TABLES.CONTENT, '#s = :section', { ':section': req.params.section });
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/content/:section/:id', async (req, res) => {
  try {
    const item = {
      id: req.params.id,
      section: req.params.section,
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    await putItem(TABLES.CONTENT, item);
    res.json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ========== Courses ==========
app.get('/api/courses', async (_req, res) => {
  try {
    const items = await scanItems(TABLES.COURSES);
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/courses/:type', async (req, res) => {
  try {
    const items = await scanItems(TABLES.COURSES, '#t = :type', { ':type': req.params.type });
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    const item = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await putItem(TABLES.COURSES, item);
    res.status(201).json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/courses/:id', async (req, res) => {
  try {
    const result = await updateItem(TABLES.COURSES, { id: req.params.id }, {
      ...req.body,
      updatedAt: new Date().toISOString(),
    });
    res.json(result.Attributes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    await deleteItem(TABLES.COURSES, { id: req.params.id });
    res.json({ deleted: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ========== News ==========
app.get('/api/news', async (_req, res) => {
  try {
    const items = await scanItems(TABLES.NEWS);
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/news/:category', async (req, res) => {
  try {
    const items = await scanItems(TABLES.NEWS, 'category = :cat', { ':cat': req.params.category });
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    const item = {
      id: uuidv4(),
      ...req.body,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await putItem(TABLES.NEWS, item);
    res.status(201).json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/news/:id', async (req, res) => {
  try {
    const result = await updateItem(TABLES.NEWS, { id: req.params.id }, {
      ...req.body,
      updatedAt: new Date().toISOString(),
    });
    res.json(result.Attributes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    await deleteItem(TABLES.NEWS, { id: req.params.id });
    res.json({ deleted: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ========== Downloads ==========
app.get('/api/downloads', async (_req, res) => {
  try {
    const items = await scanItems(TABLES.DOWNLOADS);
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/downloads', async (req, res) => {
  try {
    const item = {
      id: uuidv4(),
      ...req.body,
      downloads: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await putItem(TABLES.DOWNLOADS, item);
    res.status(201).json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/downloads/:id', async (req, res) => {
  try {
    const result = await updateItem(TABLES.DOWNLOADS, { id: req.params.id }, {
      ...req.body,
      updatedAt: new Date().toISOString(),
    });
    res.json(result.Attributes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/downloads/:id', async (req, res) => {
  try {
    await deleteItem(TABLES.DOWNLOADS, { id: req.params.id });
    res.json({ deleted: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ========== Certificates ==========
app.get('/api/certificates', async (_req, res) => {
  try {
    const items = await scanItems(TABLES.CERTIFICATES);
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/certificates', async (req, res) => {
  try {
    const item = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await putItem(TABLES.CERTIFICATES, item);
    res.status(201).json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/certificates/:id', async (req, res) => {
  try {
    const result = await updateItem(TABLES.CERTIFICATES, { id: req.params.id }, {
      ...req.body,
      updatedAt: new Date().toISOString(),
    });
    res.json(result.Attributes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/certificates/:id', async (req, res) => {
  try {
    await deleteItem(TABLES.CERTIFICATES, { id: req.params.id });
    res.json({ deleted: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ========== Recruitment ==========
app.get('/api/recruitment', async (_req, res) => {
  try {
    const items = await scanItems(TABLES.RECRUITMENT);
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/recruitment', async (req, res) => {
  try {
    const item = {
      id: uuidv4(),
      ...req.body,
      applicants: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await putItem(TABLES.RECRUITMENT, item);
    res.status(201).json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/recruitment/:id', async (req, res) => {
  try {
    const result = await updateItem(TABLES.RECRUITMENT, { id: req.params.id }, {
      ...req.body,
      updatedAt: new Date().toISOString(),
    });
    res.json(result.Attributes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/recruitment/:id', async (req, res) => {
  try {
    await deleteItem(TABLES.RECRUITMENT, { id: req.params.id });
    res.json({ deleted: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ========== Start Server (for local dev only) ==========
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
}

export default app;
