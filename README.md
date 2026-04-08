# 藍鵲驗證官網 MagpieCert

藍鵲驗證服務股份有限公司（Blue Magpie Certifications, Inc.）官方網站專案。

## 技術架構

| 項目 | 技術 |
|------|------|
| 前端框架 | Vite + React 18 + TypeScript |
| 樣式 | Tailwind CSS 3 |
| 路由 | React Router DOM 6 |
| 圖示 | Lucide React |
| 後端 API | Express 5 |
| 資料庫 | DynamoDB（正式）/ JSON 檔案（本地）/ 記憶體（Vercel） |
| 部署 | Vercel（Demo）/ AWS Lambda + S3（正式） |

## 頁面結構

### 前台頁面（7 頁）

| 頁面 | 路由 | 說明 |
|------|------|------|
| 首頁 | `/` | Banner、關於藍鵲、我們的優勢、服務項目、課程講座、聯絡 CTA |
| 關於我們 | `/about` | 公司簡介、政策聲明（4 tabs）、認證證書、菁英招募 |
| 服務項目 | `/services` | 管理系統驗證、產銷履歷驗證、有機農產驗證、ESG 相關驗證 |
| 證書查詢 | `/certificates` | 客戶名稱/證書編碼搜尋、證書狀態顯示 |
| 教育訓練 | `/education` | 最新課程、實體課程、線上講座、知識影片、企業包班 |
| 文件下載 | `/downloads` | 品質管理、農產品驗證、ESG 查驗分類下載 |
| 最新消息 | `/news` | 農業知識、媒體報導、常見問題分類 |
| 聯絡我們 | `/contact` | 獲得報價 / 意見反饋雙分頁表單 |

### 後台管理（9 頁）

| 頁面 | 路由 | 說明 |
|------|------|------|
| 登入 | `/admin/login` | 帳號密碼驗證 |
| 儀表板 | `/admin/dashboard` | 統計總覽 |
| 首頁管理 | `/admin/homepage` | Banner 與首頁內容 |
| 關於管理 | `/admin/about` | 公司簡介、政策、招募 |
| 證書管理 | `/admin/certificates` | CRUD + 搜尋 |
| 課程管理 | `/admin/courses/:type` | 依類型分類管理 |
| 下載管理 | `/admin/downloads` | 文件上傳管理 |
| 新聞管理 | `/admin/news/:type` | 分類新聞管理 |
| 招募管理 | `/admin/recruitment` | 職缺管理 |

## 服務項目內容

### 管理系統驗證
- ISO 9001 品質管理系統
- ISO 14001 環境管理系統
- ISO 45001 職業安全衛生管理
- ISO 22000 食品安全管理標準
- ISO 27001 國際資安認證

### 農產品驗證
- 產銷履歷：農糧作物、農糧加工物、農產品分裝/流通、蜂產品、養殖水產品
- 有機驗證：農糧作物、加工/分裝/流通

### ESG 查驗
- ISO 14064-1 溫室氣體查驗標準
- ISO 14067 國際碳足跡標準

## 快速開始

```bash
# 安裝依賴
npm install --ignore-scripts

# 啟動前端開發伺服器（port 5173）
npm run dev

# 啟動 API 伺服器（port 3001）
npm run dev:api

# 建置前端
npm run build
```

## Vercel 部署

1. 在 [vercel.com](https://vercel.com) Import 此 GitHub repo
2. Framework 自動偵測為 Vite
3. 點擊 Deploy 即完成

部署後 API 透過 Vercel Serverless Functions 運行，資料從 JSON 種子檔案載入記憶體。

## 後台登入

- 帳號：`admin`
- 密碼：`magpie2025`

## 目錄結構

```
magpiecert/
├── api/                    # Express API
│   ├── server.ts           # 路由定義（支援 Vercel/Lambda/本地）
│   ├── index.ts            # Vercel Serverless 進入點
│   ├── memory-db.ts        # 記憶體資料庫（Vercel 用）
│   ├── local-db.ts         # JSON 檔案資料庫（本地開發）
│   ├── dynamodb.ts         # DynamoDB 適配器（AWS 正式環境）
│   └── seed.ts             # 種子資料匯入
├── data/                   # JSON 種子資料（6 個資料表）
├── public/assets/          # 靜態圖片資源
├── src/
│   ├── App.tsx             # 路由定義
│   ├── main.tsx            # React 進入點
│   ├── index.css           # Tailwind + 自訂動畫
│   ├── components/         # 共用元件（Navbar, Footer, Hero 等）
│   ├── contexts/           # AuthContext 驗證狀態
│   ├── layouts/            # AdminLayout 後台版面
│   ├── pages/
│   │   ├── frontend/       # 前台 8 頁
│   │   └── admin/          # 後台 9 頁
│   └── services/           # API 客戶端
├── vercel.json             # Vercel 部署設定
├── tailwind.config.js      # Tailwind 配色設定
└── package.json
```
