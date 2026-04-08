/**
 * Seed script - populates database with initial data
 * Run: npx tsx api/seed.ts
 */
const isLocal = !process.env.LAMBDA_TASK_ROOT;
const db = isLocal
  ? await import('./local-db.js')
  : await import('./dynamodb.js');
const { TABLES, putItem } = db;

const seedData = {
  // Homepage & About content
  content: [
    { id: 'hero-banner', section: 'homepage', type: 'banner', mediaType: 'video', mediaUrl: '', title: '藍鵲驗證服務股份有限公司', subtitle: 'Blue Magpie Certifications, Inc.' },
    { id: 'hero-agri', section: 'homepage', type: 'hero-image', mediaUrl: '', title: '從土地出發' },
    { id: 'about-intro', section: 'homepage', type: 'about', title: '關於藍鵲', subtitle: '國際標準驗證的領航者', body: '以「藍鵲」為名，象徵我們對臺灣生態的承諾與驕傲。我們致力於推動生態農法與環境永續，打造具國際信賴度的驗證品牌，期許成為臺灣永續發展的象徵與代表。' },
    { id: 'advantage-1', section: 'homepage', type: 'advantage', title: '客製化服務', body: '深入了解客戶的管理系統，根據不同需求與行業特性，提供個性化的驗證服務，提升稽核的附加價值。', order: 1 },
    { id: 'advantage-2', section: 'homepage', type: 'advantage', title: '專業顧問', body: '擁有各領域專業且經驗豐富的顧問，同時能處理多項驗證服務，協助不同產業客戶獲得適合且有用的驗證。', order: 2 },
    { id: 'advantage-3', section: 'homepage', type: 'advantage', title: '量身規劃時程', body: '輔導時程配合客戶的人力資源配置與作業需求，制定最適合的驗證進度計劃。', order: 3 },
    { id: 'advantage-4', section: 'homepage', type: 'advantage', title: '優質服務', body: '提供即時的諮詢與服務，縮短驗證時間，驗證完成後，提供持續的改進建議及支援。', order: 4 },
    { id: 'about-company', section: 'about', type: 'company-intro', title: '關於藍鵲', subtitle: '國際標準驗證的領航者', body: '以「藍鵲」為名，象徵我們對臺灣生態的承諾與驕傲。' },
    { id: 'policy-quality', section: 'about', type: 'policy', title: '驗證品質政策', body: '以嚴謹專業的態度、公正透明的過程，提供高品質驗證服務。', order: 1 },
    { id: 'policy-talent', section: 'about', type: 'policy', title: '人才發展品質政策', body: '', order: 2 },
    { id: 'policy-fairness', section: 'about', type: 'policy', title: '公正性聲明', body: '', order: 3 },
    { id: 'policy-finance', section: 'about', type: 'policy', title: '財務來源', body: '', order: 4 },
  ],

  // Courses
  courses: [
    { id: 'C-001', title: 'ISO 9001 品質管理系統主導稽核員訓練', type: 'physical', category: '品質管理', date: '2025-04-15', status: '報名中', students: 24, maxStudents: 30, description: '' },
    { id: 'C-002', title: '產銷履歷稽核人員教育訓練', type: 'physical', category: '農產品驗證', date: '2025-04-22', status: '報名中', students: 18, maxStudents: 25, description: '' },
    { id: 'C-003', title: 'ISO 14064-1 溫室氣體盤查實務班', type: 'physical', category: 'ESG查驗', date: '2025-05-10', status: '即將開課', students: 30, maxStudents: 30, description: '' },
    { id: 'C-004', title: 'ISO 22000 食品安全管理系統內部稽核', type: 'physical', category: '品質管理', date: '2025-05-18', status: '草稿', students: 0, maxStudents: 25, description: '' },
    { id: 'C-005', title: '有機農產品驗證實務工作坊', type: 'physical', category: '農產品驗證', date: '2025-06-01', status: '報名中', students: 12, maxStudents: 20, description: '' },
    { id: 'C-006', title: 'ISO 14067 碳足跡查驗線上講座', type: 'online', category: 'ESG查驗', date: '2025-05-05', status: '報名中', students: 45, maxStudents: 100, description: '' },
    { id: 'C-007', title: '品質管理系統基礎概念', type: 'online', category: '品質管理', date: '2025-04-28', status: '報名中', students: 62, maxStudents: 100, description: '' },
  ],

  // News
  news: [
    { id: 'N-001', title: '2025年有機驗證新規範正式上路', category: '農產新知', status: '已發布', author: 'Admin', date: '2025-03-25', views: 1234, body: '' },
    { id: 'N-002', title: '藍鵲驗證獲得TAF認證機構擴充認可', category: '新聞媒體', status: '已發布', author: 'Admin', date: '2025-03-20', views: 856, body: '' },
    { id: 'N-003', title: '什麼是產銷履歷？如何申請？', category: '常見問題', status: '已發布', author: 'Admin', date: '2025-03-15', views: 2341, body: '' },
    { id: 'N-004', title: '新增服務項目：產銷履歷農產品分裝/流通', category: '農產新知', status: '已發布', author: 'Admin', date: '2025-03-10', views: 567, body: '' },
    { id: 'N-005', title: 'ESG永續報告書查驗服務全面啟動', category: '新聞媒體', status: '草稿', author: 'Admin', date: '2025-03-08', views: 0, body: '' },
    { id: 'N-006', title: 'ISO驗證費用如何計算？', category: '常見問題', status: '已發布', author: 'Admin', date: '2025-03-05', views: 1890, body: '' },
  ],

  // Downloads
  downloads: [
    { id: 'D-001', name: '驗證品質政策及目標聲明', category: '品質管理', format: 'PDF', size: '1.2 MB', downloads: 342, fileUrl: '' },
    { id: 'D-002', name: '人才發展品質政策及目標聲明', category: '品質管理', format: 'PDF', size: '1.1 MB', downloads: 215, fileUrl: '' },
    { id: 'D-003', name: '產銷履歷驗證申請書 (v2.2)', category: '農產品驗證', format: 'PDF', size: '2.4 MB', downloads: 567, fileUrl: '' },
    { id: 'D-004', name: '有機農產品驗證申請書', category: '農產品驗證', format: 'PDF', size: '1.8 MB', downloads: 423, fileUrl: '' },
    { id: 'D-005', name: 'ISO 14064-1 溫室氣體查驗申請表', category: 'ESG查驗', format: 'PDF', size: '0.9 MB', downloads: 189, fileUrl: '' },
    { id: 'D-006', name: 'ISO 14067 碳足跡查驗申請表', category: 'ESG查驗', format: 'PDF', size: '1.0 MB', downloads: 156, fileUrl: '' },
  ],

  // Certificates
  certificates: [
    { id: 'T-2024-001', name: '陽光有機農園股份有限公司', type: '有機驗證農糧', issueDate: '2024-01-15', status: 'active' },
    { id: 'T-2024-002', name: '綠生水產養殖場', type: '產銷履歷水產', issueDate: '2024-03-22', status: 'active' },
    { id: 'T-2024-003', name: '大樹果物合作社', type: '產銷履歷農產', issueDate: '2023-11-05', status: 'expired' },
    { id: 'T-2024-004', name: '原野蜂業有限公司', type: '產銷履歷蜂產', issueDate: '2024-05-10', status: 'pending' },
  ],

  // Recruitment
  recruitment: [
    { id: 'R-001', title: 'ISO品質管理系統 稽核員', department: '驗證部', type: '全職', status: '招募中', applicants: 12 },
    { id: 'R-002', title: '農產品驗證 專案管理師', department: '農產品部', type: '全職', status: '招募中', applicants: 8 },
    { id: 'R-003', title: 'ESG查驗 分析師', department: '永續部', type: '全職', status: '招募中', applicants: 15 },
  ],
};

async function seed() {
  console.log('Seeding DynamoDB tables...\n');

  for (const item of seedData.content) {
    await putItem(TABLES.CONTENT, { ...item, updatedAt: new Date().toISOString() });
    console.log(`  ✓ Content: ${item.id}`);
  }

  for (const item of seedData.courses) {
    await putItem(TABLES.COURSES, { ...item, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    console.log(`  ✓ Course: ${item.id} - ${item.title}`);
  }

  for (const item of seedData.news) {
    await putItem(TABLES.NEWS, { ...item, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    console.log(`  ✓ News: ${item.id} - ${item.title}`);
  }

  for (const item of seedData.downloads) {
    await putItem(TABLES.DOWNLOADS, { ...item, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    console.log(`  ✓ Download: ${item.id} - ${item.name}`);
  }

  for (const item of seedData.certificates) {
    await putItem(TABLES.CERTIFICATES, { ...item, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    console.log(`  ✓ Certificate: ${item.id} - ${item.clientName}`);
  }

  for (const item of seedData.recruitment) {
    await putItem(TABLES.RECRUITMENT, { ...item, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    console.log(`  ✓ Recruitment: ${item.id} - ${item.title}`);
  }

  console.log('\n✅ Seed complete!');
}

seed().catch(console.error);
