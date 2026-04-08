# 藍鵲驗證官網 — 專案架構文件

> **專案名稱：** bluemagpie (MagpieCert)
> **版本：** 0.1.0
> **最後更新：** 2026-04-04
> **類型：** 全端驗證與教育訓練管理平台

---

## 目錄

1. [專案總覽](#1-專案總覽)
2. [技術棧](#2-技術棧)
3. [目錄結構](#3-目錄結構)
4. [前端架構](#4-前端架構)
   - 4.1 進入點與啟動流程
   - 4.2 路由系統
   - 4.3 版面配置（Layouts）
   - 4.4 前台頁面
   - 4.5 後台管理頁面
   - 4.6 共用元件
   - 4.7 狀態管理與驗證
   - 4.8 API 服務層
5. [後端架構](#5-後端架構)
   - 5.1 伺服器架構
   - 5.2 API 端點總覽
   - 5.3 身份驗證機制
   - 5.4 資料庫抽象層
   - 5.5 資料種子腳本
6. [資料模型](#6-資料模型)
7. [樣式系統](#7-樣式系統)
8. [建置與部署](#8-建置與部署)
   - 8.1 開發環境
   - 8.2 建置流程
   - 8.3 AWS 部署架構
   - 8.4 環境變數
9. [靜態資源](#9-靜態資源)
10. [設計模式與慣例](#10-設計模式與慣例)
11. [程式碼統計](#11-程式碼統計)

---

## 1. 專案總覽

藍鵲驗證官網是一套為「藍鵲驗證服務股份有限公司」打造的全端平台，涵蓋：

- **前台官網**：品牌形象展示、服務介紹、證書查詢、課程報名、最新消息、文件下載、聯絡表單
- **後台管理系統**：完整 CRUD 管理（首頁內容、關於我們、證書、課程、新聞、下載、招募）
- **RESTful API**：Express.js 伺服器，支援本地 JSON 開發模式與 AWS DynamoDB 正式環境
- **無伺服器部署**：透過 Serverless Framework 部署至 AWS Lambda + API Gateway

### 系統架構圖

```
┌─────────────────────────────────────────────────────────────────┐
│                         使用者瀏覽器                              │
│                                                                 │
│   ┌──────────────────────┐    ┌──────────────────────────────┐  │
│   │  前台官網 (React SPA) │    │  後台管理系統 (React SPA)      │  │
│   │  /                   │    │  /admin/*                    │  │
│   │  /about              │    │  ProtectedRoute 路由守衛       │  │
│   │  /services           │    │  AuthContext 身份驗證          │  │
│   │  /certificates       │    └──────────────────────────────┘  │
│   │  /education          │                                      │
│   │  /downloads          │                                      │
│   │  /news               │                                      │
│   │  /contact            │                                      │
│   └──────────────────────┘                                      │
└────────────────────────────────┬─────────────────────────────────┘
                                 │ HTTP (fetch)
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API 伺服器 (Express.js)                      │
│                                                                 │
│   /api/health          健康檢查                                   │
│   /api/auth/*          身份驗證 (login, verify)                   │
│   /api/stats           統計數據                                   │
│   /api/content/*       內容管理 (首頁、關於)                        │
│   /api/courses/*       課程管理                                   │
│   /api/news/*          新聞管理                                   │
│   /api/downloads/*     下載管理                                   │
│   /api/certificates/*  證書管理                                   │
│   /api/recruitment/*   招募管理                                   │
└────────────────────────────────┬─────────────────────────────────┘
                                 │
              ┌──────────────────┴──────────────────┐
              ▼                                     ▼
┌──────────────────────┐             ┌──────────────────────────┐
│  本地開發 (local-db)   │             │  正式環境 (DynamoDB)       │
│  data/*.json 檔案      │             │  6 張 DynamoDB 資料表      │
│  fs 讀寫               │             │  PAY_PER_REQUEST          │
└──────────────────────┘             └──────────────────────────┘
```

---

## 2. 技術棧

### 前端

| 技術 | 版本 | 用途 |
|------|------|------|
| React | 18.2.0 | UI 框架 |
| React Router DOM | 6.22.0 | 客戶端路由 |
| TypeScript | 5.3.0 | 型別安全 |
| Tailwind CSS | 3.4.1 | 原子化樣式 |
| Vite | 5.1.0 | 建置工具與開發伺服器 |
| lucide-react | 1.7.0 | 圖示元件庫 |

### 後端

| 技術 | 版本 | 用途 |
|------|------|------|
| Express | 5.2.1 | HTTP 伺服器框架 |
| @aws-sdk/client-dynamodb | 3.1023.0 | DynamoDB 底層操作 |
| @aws-sdk/lib-dynamodb | 3.1023.0 | DynamoDB 文件客戶端 |
| @aws-sdk/client-s3 | 3.1023.0 | S3 檔案存取（預備） |
| @vendia/serverless-express | 4.12.6 | Lambda 整合橋接 |
| uuid | 13.0.0 | 唯一識別碼產生 |
| cors | 2.8.6 | 跨域資源共享 |

### 開發與部署

| 技術 | 版本 | 用途 |
|------|------|------|
| Serverless Framework | 4.33.3 | AWS Lambda 部署 |
| serverless-offline | 14.5.0 | 本地 Lambda 模擬 |
| @vitejs/plugin-react | 4.2.0 | Vite React 插件 |
| PostCSS | 8.4.35 | CSS 後處理 |
| Autoprefixer | 10.4.17 | CSS 前綴自動補全 |

---

## 3. 目錄結構

```
藍鵲/
├── api/                          # 後端 API 原始碼
│   ├── server.ts                 # Express 主伺服器 (354 行)
│   ├── lambda.ts                 # AWS Lambda 進入點 (4 行)
│   ├── local-db.ts               # 本地 JSON 資料庫適配器 (104 行)
│   ├── dynamodb.ts               # DynamoDB 資料庫適配器 (75 行)
│   └── seed.ts                   # 種子資料腳本 (111 行)
│
├── data/                         # 本地開發用 JSON 資料檔
│   ├── content.json              # 首頁與關於頁面內容 (12 筆)
│   ├── courses.json              # 課程資料 (7 筆)
│   ├── news.json                 # 新聞資料 (6 筆)
│   ├── downloads.json            # 下載資料 (6 筆)
│   ├── certificates.json         # 證書資料 (4 筆)
│   └── recruitment.json          # 招募資料 (3 筆)
│
├── public/                       # 靜態資源
│   └── assets/                   # 圖片資源 (10 檔, ~8MB)
│
├── src/                          # 前端原始碼
│   ├── main.tsx                  # React 進入點 (8 行)
│   ├── App.tsx                   # 路由設定 (90 行)
│   ├── index.css                 # 全域樣式 + Tailwind 指令 (21 行)
│   │
│   ├── components/               # 共用元件
│   │   ├── Navbar.tsx            # 頂部導覽列 (82 行)
│   │   ├── Footer.tsx            # 頁尾 (84 行)
│   │   ├── Hero.tsx              # 首頁主視覺 (41 行)
│   │   ├── AboutUs.tsx           # 關於藍鵲區塊 (59 行)
│   │   ├── Advantages.tsx        # 優勢區塊 (61 行)
│   │   ├── Services.tsx          # 服務項目區塊 (82 行)
│   │   ├── HomeCourses.tsx       # 課程講座區塊 (110 行)
│   │   ├── News.tsx              # 最新消息區塊 (78 行)
│   │   ├── CtaBanner.tsx         # 行動呼籲橫幅 (33 行)
│   │   ├── ProtectedRoute.tsx    # 路由守衛元件 (23 行)
│   │   └── layout/
│   │       └── Layout.tsx        # 備用版面配置 (189 行)
│   │
│   ├── contexts/                 # React Context
│   │   └── AuthContext.tsx       # 身份驗證上下文 (78 行)
│   │
│   ├── layouts/                  # 版面配置
│   │   └── AdminLayout.tsx       # 後台版面 (170 行)
│   │
│   ├── pages/
│   │   ├── frontend/             # 前台頁面
│   │   │   ├── Home.tsx          # 首頁 (22 行)
│   │   │   ├── About.tsx         # 關於我們 (180 行)
│   │   │   ├── Services.tsx      # 服務項目 (163 行)
│   │   │   ├── CertificateSearch.tsx  # 證書查詢 (121 行)
│   │   │   ├── Education.tsx     # 教育訓練 (253 行)
│   │   │   ├── Downloads.tsx     # 下載專區 (97 行)
│   │   │   ├── News.tsx          # 最新消息 (156 行)
│   │   │   └── Contact.tsx       # 聯絡我們 (124 行)
│   │   │
│   │   └── admin/                # 後台頁面
│   │       ├── Login.tsx         # 登入頁 (112 行)
│   │       ├── Dashboard.tsx     # 控制台 (75 行)
│   │       ├── HomepageManage.tsx    # 首頁管理 (131 行)
│   │       ├── AboutManage.tsx       # 關於管理 (295 行)
│   │       ├── CourseManage.tsx      # 課程管理 (256 行)
│   │       ├── Certificates.tsx      # 證書管理 (208 行)
│   │       ├── NewsManage.tsx        # 新聞管理 (209 行)
│   │       ├── DownloadManage.tsx    # 下載管理 (219 行)
│   │       ├── RecruitmentManage.tsx # 招募管理 (219 行)
│   │       └── ContentManage.tsx     # 內容管理 (117 行)
│   │
│   └── services/                 # API 服務層
│       └── api.ts                # API 客戶端 (68 行)
│
├── dist/                         # 前端建置產出
├── dist-api/                     # 後端建置產出
│
├── index.html                    # HTML 進入點
├── package.json                  # 專案配置
├── vite.config.ts                # Vite 設定
├── tsconfig.json                 # 前端 TypeScript 設定
├── tsconfig.api.json             # 後端 TypeScript 設定
├── tailwind.config.js            # Tailwind CSS 設定
├── postcss.config.js             # PostCSS 設定
├── serverless.yml                # Serverless Framework 部署設定
├── amplify.yml                   # AWS Amplify 部署設定
└── 藍鵲官網架構.pdf               # 原始架構設計文件
```

---

## 4. 前端架構

### 4.1 進入點與啟動流程

```
index.html
  ├── 載入 Google Fonts (Noto Sans TC + Playfair Display)
  ├── <div id="root">
  └── /src/main.tsx
        ├── React.StrictMode
        └── <App />
              ├── <BrowserRouter>
              ├── <AuthProvider>      ← 身份驗證上下文
              └── <Routes>            ← 路由定義
```

**`index.html`** — 語系設為 `zh-TW`，預先連接 Google Fonts CDN，透過 `<script type="module">` 載入 Vite 進入點。

**`src/main.tsx`** (8 行) — 以 `React.StrictMode` 包裹 `<App />`，掛載至 `#root`，匯入全域樣式 `index.css`。

**`src/index.css`** (21 行) — 包含 Tailwind 三層指令 (`@tailwind base/components/utilities`)，設定全域 body 樣式 (`font-sans text-magpie-dark antialiased`)，自訂 `.bg-grid-pattern` 網格背景。

### 4.2 路由系統

採用 React Router v6 巢狀路由架構，分為前台與後台兩大區塊：

```
BrowserRouter
├── AuthProvider
│
├── FrontLayout (Navbar + Outlet + Footer)
│   ├── /                → Home
│   ├── /about            → About
│   ├── /services         → Services
│   ├── /certificates     → CertificateSearch
│   ├── /education        → Education
│   ├── /downloads        → Downloads
│   ├── /news             → News
│   └── /contact          → Contact
│
├── /admin/login          → Login (不受 ProtectedRoute 保護)
│
└── ProtectedRoute → AdminLayout (Sidebar + Outlet)
    ├── /admin            → Navigate → /admin/dashboard
    ├── /admin/dashboard  → Dashboard
    ├── /admin/homepage   → HomepageManage
    ├── /admin/about      → AboutManage
    ├── /admin/certificates → Certificates
    ├── /admin/courses/:type → CourseManage
    │   (type: physical | online | videos | corporate)
    ├── /admin/downloads  → DownloadManage
    ├── /admin/news/:type → NewsManage
    │   (type: agriculture | media | faq)
    └── /admin/recruitment → RecruitmentManage
```

**`ScrollToTop`** — 巢狀在 `FrontLayout` 中，監聽 `pathname` 變化自動捲動至頁首。

### 4.3 版面配置（Layouts）

#### FrontLayout（前台）

定義在 `App.tsx` 中的行內元件：

```tsx
const FrontLayout = () => (
  <div className="min-h-screen flex flex-col font-sans bg-white">
    <ScrollToTop />
    <Navbar />          ← 固定頂部導覽
    <main className="flex-1 mt-16 md:mt-20">
      <Outlet />        ← 頁面內容插入點
    </main>
    <Footer />          ← 頁尾
  </div>
);
```

#### AdminLayout（後台） — `src/layouts/AdminLayout.tsx` (170 行)

```
┌──────────────────────────────────────────────────┐
│ Sidebar (fixed, w-64)    │ Topbar (sticky)       │
│ ┌──────────────────────┐ │ ┌──────────────────┐  │
│ │ 內部管理系統          │ │ │ ☰  藍鵲驗證      │  │
│ │ ─────────────────── │ │ │     管理員 [登出] │  │
│ │ 控制台總覽           │ │ └──────────────────┘  │
│ │ 首頁管理             │ │                        │
│ │ 關於我們管理          │ │ Content Area           │
│ │ 證書查詢管理          │ │ ┌──────────────────┐  │
│ │ ▼ 教育訓練管理        │ │ │                  │  │
│ │   實體課程            │ │ │   <Outlet />     │  │
│ │   線上講座            │ │ │                  │  │
│ │   知識影片            │ │ │                  │  │
│ │   企業包班            │ │ └──────────────────┘  │
│ │ 文件下載管理          │ │                        │
│ │ ▶ 最新消息管理        │ │                        │
│ │ 菁英招募管理          │ │                        │
│ │ ─────────────────── │ │                        │
│ │ 前往官網             │ │                        │
│ └──────────────────────┘ │                        │
└──────────────────────────────────────────────────┘
```

- **Sidebar**：固定左側 (`fixed inset-y-0 left-0`)，寬度 `w-64`，深藍背景 (`bg-magpie-dark`)
- **可折疊子選單**：教育訓練管理、最新消息管理使用 `expandedMenus` 狀態控制展開
- **行動裝置**：透過 `sidebarOpen` 狀態切換顯示，使用 `transform translate-x` 動畫
- **Topbar**：黏性定位 (`sticky top-0`)，含漢堡選單按鈕、使用者資訊、登出按鈕
- **使用者資訊**：從 `useAuth()` 取得 `user.name` 動態顯示
- **登出功能**：呼叫 `logout()` 清除 session 後導航至 `/admin/login`

### 4.4 前台頁面

#### Home (`src/pages/frontend/Home.tsx`, 22 行)

純組合頁面，依序渲染 6 個首頁區塊元件：

```tsx
<Hero /> → <AboutUs /> → <Advantages /> → <Services /> → <HomeCourses /> → <CtaBanner />
```

#### About (`src/pages/frontend/About.tsx`, 180 行)

- 深藍主視覺橫幅 + 白色波浪 SVG 分隔
- 標籤式政策展示（4 個 tab）：驗證品質、人才培育品質、公正性聲明、財務資源
- 各 tab 附帶圖示（CheckCircle、TrendingUp、Shield、FileText）
- 品質政策卡片以格狀排列顯示

#### Services (`src/pages/frontend/Services.tsx`, 163 行)

- 左側分類選單（可折疊子分類）
- 主要分類：管理系統驗證、產銷履歷驗證、有機農產驗證、ESG 相關驗證
- 右側動態內容區依據 `activeCategory` 顯示
- 麵包屑導覽

#### CertificateSearch (`src/pages/frontend/CertificateSearch.tsx`, 121 行)

- 搜尋引擎介面（輸入證書編號或公司名稱）
- 結果顯示含狀態標籤（active/expired/pending 對應綠/紅/黃）
- 從 `certificatesApi.getAll()` 取得資料

#### Education (`src/pages/frontend/Education.tsx`, 253 行)

- 課程/訓練列表頁
- 報名彈窗表單（含姓名、生日、性別、身分證字號、Email、電話、地址欄位）
- 依課程類型篩選

#### Downloads (`src/pages/frontend/Downloads.tsx`, 97 行)

- 依分類排列的檔案列表（品質管理、農產品驗證、ESG 查驗）
- 下載按鈕含檔案格式與大小資訊
- 從 `downloadsApi.getAll()` 取得資料

#### News (`src/pages/frontend/News.tsx`, 156 行)

- 分類篩選標籤（全部消息、農業知識、媒體報導）
- 搜尋功能
- 僅顯示 `status === '已發布'` 的文章

#### Contact (`src/pages/frontend/Contact.tsx`, 124 行)

- 左側公司資訊（藍底白字）：地址、電話、傳真、信箱、營業時間
- 右側聯絡表單：公司名稱、聯絡人、Email、電話、地址、訊息

### 4.5 後台管理頁面

所有後台頁面位於 `src/pages/admin/`，由 `ProtectedRoute` + `AdminLayout` 包裹。

#### Login (`Login.tsx`, 112 行)

- 受控表單元件（useState 管理 username / password / error / submitting）
- 呼叫 `useAuth().login()` 進行驗證
- 已登入時自動重導向至 Dashboard（`<Navigate to="/admin/dashboard" />`）
- 錯誤訊息以紅色 alert 顯示
- 提交按鈕含載入狀態

#### Dashboard (`Dashboard.tsx`, 75 行)

- 5 張統計卡片（有效證書、課程總數、最新消息、下載文件、招募職缺）
- 從 `statsApi.get()` 動態取得各資源筆數
- 最近活動紀錄列表（目前為靜態資料）
- 響應式格狀排列：`grid-cols-2 md:grid-cols-3 lg:grid-cols-5`

#### HomepageManage (`HomepageManage.tsx`, 131 行)

- 橫幅類型切換（video/image）
- 拖曳上傳區域
- 5 個區塊的可見性切換開關
- 透過 `contentApi.update()` 儲存

#### AboutManage (`AboutManage.tsx`, 295 行)

- 三個標籤頁：公司簡介、政策聲明、菁英招募
- 公司簡介文字編輯器
- 政策項目 CRUD 操作

#### CourseManage (`CourseManage.tsx`, 256 行)

- 依 URL 參數 `:type` 篩選課程類型（physical / online / videos / corporate）
- 分類內搜尋功能
- 表格檢視：標題、分類、日期、狀態、學員/上限
- 新增/編輯彈窗表單
- 狀態管理：草稿、報名中、即將開課

#### Certificates (`Certificates.tsx`, 208 行)

- 搜尋 + 狀態篩選（active / expired / pending）
- 表格檢視：證書編號、公司名稱、類型、核發日期、狀態
- 狀態標籤色碼：綠色（有效）/ 紅色（過期）/ 黃色（審核中）

#### NewsManage (`NewsManage.tsx`, 209 行)

- 依 URL 參數 `:type` 篩選分類（agriculture / media / faq）
- 搜尋標題與內容
- 表格檢視：標題、分類、狀態、作者、瀏覽數
- 新增/編輯彈窗含富文字內容編輯

#### DownloadManage (`DownloadManage.tsx`, 219 行)

- 分類篩選：全部、品質管理、農產品驗證、ESG 查驗
- 表格檢視：檔名、格式、大小、下載次數
- 檔案上傳介面

#### RecruitmentManage (`RecruitmentManage.tsx`, 219 行)

- 篩選：全部 / 招募中 / 已截止
- 表格檢視：職缺名稱、部門、類型、狀態、應徵人數
- 新增/編輯彈窗表單

### 4.6 共用元件

#### Navbar (`src/components/Navbar.tsx`, 82 行)

- 固定頂部定位（`fixed top-0 z-50`）
- 桌面：水平連結列 + logo
- 行動裝置：漢堡選單按鈕 + 下拉式選單
- 使用 `useLocation()` 高亮當前路由

#### Footer (`src/components/Footer.tsx`, 84 行)

- 深色背景（`bg-magpie-dark`）
- 三欄式：公司資訊、快速連結（品質管理/農產品驗證/ESG 查驗/教育訓練）、聯絡資訊
- 公司地址：台北市內湖區新湖二路128號5樓之1
- 聯絡電話：(02) 8791-8011
- 信箱：services@magpiecert.com
- 底部版權聲明 + 隱私權政策/服務條款連結

#### Hero (`src/components/Hero.tsx`, 41 行)

- 雙段式主視覺
- 第一段：深色科技背景 + 公司中英文名稱
- 第二段：農業意象圖片 + 「從土地出發」標語

#### AboutUs (`src/components/AboutUs.tsx`, 59 行)

- 左右分欄：文字介紹 + 圖片（溫室）
- 圖片帶有對角線藍色裝飾（`clip-path: polygon`）
- 「DISCOVER MORE」按鈕連結至 `/about`

#### Advantages (`src/components/Advantages.tsx`, 61 行)

- 4 欄格狀排列（`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`）
- 各卡片含圓形圖片、標題、描述
- 滑鼠懸停放大效果（`group-hover:scale-105`）
- 4 項優勢：客製化服務、專業顧問、量身規劃時程、優質服務

#### Services (`src/components/Services.tsx`, 82 行)

- 非對稱格狀排列（農產品驗證佔左側 `row-span-2`）
- 3 張服務卡片：農產品驗證、管理系統驗證、ESG 查驗
- 圖片覆蓋漸層 + 標題

#### HomeCourses (`src/components/HomeCourses.tsx`, 110 行)

- 從 `coursesApi.getAll()` 動態載入課程資料
- 篩選非草稿課程，依日期排序，取前 5 筆
- 左欄：說明文字 + 課程圖片
- 右欄：最新活動列表 + 「DISCOVER MORE」按鈕
- 日期格式化：YYYY.MM.DD

#### News (`src/components/News.tsx`, 78 行)

- 3 張新聞卡片（靜態資料）
- 含分類標籤、圖片（模糊效果）、標題、日期
- 「全部消息」連結

#### CtaBanner (`src/components/CtaBanner.tsx`, 33 行)

- 全寬背景圖 + 半透明覆蓋層
- 標語：「信任的橋樑，專業的保障」
- 「立即諮詢」按鈕連結至 `/contact`

#### ProtectedRoute (`src/components/ProtectedRoute.tsx`, 23 行)

- 檢查 `useAuth()` 回傳的 `user` 與 `loading` 狀態
- `loading` 時顯示載入提示
- 未登入時重導向至 `/admin/login`

### 4.7 狀態管理與驗證

#### AuthContext (`src/contexts/AuthContext.tsx`, 78 行)

```typescript
interface AuthContextType {
  user: User | null;          // { name: string, role: string }
  token: string | null;       // Base64 編碼的認證令牌
  loading: boolean;           // 初始驗證中
  login(username, password): Promise<{ success, error? }>;
  logout(): void;
}
```

**驗證流程：**

```
1. 頁面載入 → useEffect 檢查 sessionStorage('auth_token')
2. 有 token → GET /api/auth/verify (Authorization: Bearer <token>)
   ├── 有效 → 設定 user + token 狀態
   └── 無效 → 清除 sessionStorage
3. 無 token → 設定 loading = false

登入流程：
1. POST /api/auth/login { username, password }
2. 成功 → sessionStorage 儲存 token，設定 user 狀態
3. 失敗 → 回傳錯誤訊息

登出流程：
1. 清除 sessionStorage('auth_token')
2. 設定 user = null, token = null
```

### 4.8 API 服務層

**`src/services/api.ts`** (68 行) — 集中式 API 客戶端

```typescript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// 通用請求函式，自動加上 Content-Type: application/json
async function request<T>(path: string, options?: RequestInit): Promise<T>
```

| 模組 | 方法 |
|------|------|
| `statsApi` | `get()` → 各資源筆數統計 |
| `contentApi` | `getBySection(section)`, `update(section, id, data)` |
| `coursesApi` | `getAll()`, `getByType(type)`, `create(data)`, `update(id, data)`, `delete(id)` |
| `newsApi` | `getAll()`, `getByCategory(category)`, `create(data)`, `update(id, data)`, `delete(id)` |
| `downloadsApi` | `getAll()`, `create(data)`, `update(id, data)`, `delete(id)` |
| `certificatesApi` | `getAll()`, `create(data)`, `update(id, data)`, `delete(id)` |
| `recruitmentApi` | `getAll()`, `create(data)`, `update(id, data)`, `delete(id)` |

---

## 5. 後端架構

### 5.1 伺服器架構

**`api/server.ts`** (354 行) — Express.js 主伺服器

```
Express App
├── 中介軟體
│   ├── cors()              跨域支援
│   └── express.json()      JSON 解析
│
├── 資料庫抽象層 (條件匯入)
│   ├── 本地開發 → local-db.ts (JSON 檔案)
│   └── Lambda 環境 → dynamodb.ts (AWS DynamoDB)
│   （依據 process.env.LAMBDA_TASK_ROOT 判斷）
│
├── 路由群組
│   ├── /api/health         GET
│   ├── /api/auth/*         POST login, GET verify
│   ├── /api/stats          GET
│   ├── /api/content/*      GET, PUT
│   ├── /api/courses/*      GET, POST, PUT, DELETE
│   ├── /api/news/*         GET, POST, PUT, DELETE
│   ├── /api/downloads/*    GET, POST, PUT, DELETE
│   ├── /api/certificates/* GET, POST, PUT, DELETE
│   └── /api/recruitment/*  GET, POST, PUT, DELETE
│
└── 本地開發伺服器
    └── app.listen(PORT || 3001)
```

**`api/lambda.ts`** (4 行) — AWS Lambda 入口

```typescript
import serverlessExpress from '@vendia/serverless-express';
import app from './server.js';
export const handler = serverlessExpress({ app });
```

### 5.2 API 端點總覽

#### 身份驗證

| 方法 | 路徑 | 說明 | 請求 | 回應 |
|------|------|------|------|------|
| POST | `/api/auth/login` | 管理員登入 | `{ username, password }` | `{ success, token, user }` 或 `401` |
| GET | `/api/auth/verify` | 令牌驗證 | Header: `Authorization: Bearer <token>` | `{ valid, user }` 或 `401` |

#### 統計

| 方法 | 路徑 | 說明 | 回應 |
|------|------|------|------|
| GET | `/api/stats` | 各資源總數 | `{ certificates, courses, news, downloads, recruitment }` |

#### 內容管理 (Content)

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/content/:section` | 取得指定區塊內容（homepage / about） |
| PUT | `/api/content/:section/:id` | 更新指定內容項目 |

#### 課程管理 (Courses)

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/courses` | 取得所有課程 |
| GET | `/api/courses/:type` | 依類型篩選（physical / online / videos / corporate） |
| POST | `/api/courses` | 新增課程（自動產生 UUID） |
| PUT | `/api/courses/:id` | 更新課程 |
| DELETE | `/api/courses/:id` | 刪除課程 |

#### 新聞管理 (News)

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/news` | 取得所有新聞 |
| GET | `/api/news/:category` | 依分類篩選（農產新知 / 新聞媒體 / 常見問題） |
| POST | `/api/news` | 新增新聞（自動設定 views: 0） |
| PUT | `/api/news/:id` | 更新新聞 |
| DELETE | `/api/news/:id` | 刪除新聞 |

#### 下載管理 (Downloads)

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/downloads` | 取得所有下載檔案 |
| POST | `/api/downloads` | 新增下載（自動設定 downloads: 0） |
| PUT | `/api/downloads/:id` | 更新下載 |
| DELETE | `/api/downloads/:id` | 刪除下載 |

#### 證書管理 (Certificates)

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/certificates` | 取得所有證書 |
| POST | `/api/certificates` | 新增證書 |
| PUT | `/api/certificates/:id` | 更新證書 |
| DELETE | `/api/certificates/:id` | 刪除證書 |

#### 招募管理 (Recruitment)

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/recruitment` | 取得所有職缺 |
| POST | `/api/recruitment` | 新增職缺（自動設定 applicants: 0） |
| PUT | `/api/recruitment/:id` | 更新職缺 |
| DELETE | `/api/recruitment/:id` | 刪除職缺 |

### 5.3 身份驗證機制

```
認證方式: Token-based (Base64 編碼)
令牌格式: Base64(username:timestamp)
儲存位置: 前端 sessionStorage
傳輸方式: Authorization: Bearer <token>
帳號來源: 環境變數 ADMIN_USER / ADMIN_PASS
預設帳密: admin / magpie2025
```

**login 端點邏輯：**
1. 比對 `username` 與 `password` 是否與環境變數一致
2. 成功：產生 Base64 token，回傳 `{ success: true, token, user }`
3. 失敗：回傳 `401 { success: false, error: '帳號或密碼錯誤' }`

**verify 端點邏輯：**
1. 解析 `Authorization` header 中的 Bearer token
2. Base64 解碼取得 username
3. 比對 username 是否為有效管理員
4. 有效：回傳 `{ valid: true, user }`
5. 無效：回傳 `401 { valid: false }`

### 5.4 資料庫抽象層

本專案實作了兩套相容的資料庫適配器，透過環境偵測自動切換：

```typescript
const isLocal = !process.env.LAMBDA_TASK_ROOT;
const db = isLocal ? await import('./local-db.js') : await import('./dynamodb.js');
```

#### 統一介面

兩套適配器皆匯出相同的函式簽章：

```typescript
export const TABLES: Record<string, string>;
export function putItem(table, item): Promise<void>;
export function getItem(table, key): Promise<any>;
export function scanItems(table, filterExpression?, expressionValues?): Promise<any[]>;
export function updateItem(table, key, updates): Promise<{ Attributes: any }>;
export function deleteItem(table, key): Promise<void>;
export function queryItems(table, keyCondition, expressionValues, indexName?): Promise<any[]>;
```

#### local-db.ts (104 行) — 本地 JSON 檔案資料庫

- 資料存放於 `data/` 目錄下的 JSON 檔案
- 使用 `fs.readFileSync` / `fs.writeFileSync` 同步讀寫
- `scanItems` 支援簡易篩選表達式（`#s`→section, `#t`→type, `category`）
- `updateItem` 使用物件展開合併更新，未找到時自動建立
- 適合快速開發與測試

#### dynamodb.ts (75 行) — AWS DynamoDB 適配器

- 使用 `DynamoDBDocumentClient` 高階客戶端
- `updateItem` 自動建構 `UpdateExpression`、`ExpressionAttributeNames`、`ExpressionAttributeValues`
- `scanItems` 支援 `FilterExpression` 篩選
- 資料表名稱從環境變數取得

#### 資料表名稱對照

| 常數 | 本地檔案 | DynamoDB 資料表 |
|------|----------|----------------|
| `TABLES.CONTENT` | `data/content.json` | `magpiecert-api-content-prod` |
| `TABLES.COURSES` | `data/courses.json` | `magpiecert-api-courses-prod` |
| `TABLES.NEWS` | `data/news.json` | `magpiecert-api-news-prod` |
| `TABLES.DOWNLOADS` | `data/downloads.json` | `magpiecert-api-downloads-prod` |
| `TABLES.CERTIFICATES` | `data/certificates.json` | `magpiecert-api-certificates-prod` |
| `TABLES.RECRUITMENT` | `data/recruitment.json` | `magpiecert-api-recruitment-prod` |

### 5.5 資料種子腳本

**`api/seed.ts`** (111 行) — 初始資料植入

```bash
npx tsx api/seed.ts
```

植入資料數量：

| 資源 | 筆數 | 說明 |
|------|------|------|
| Content | 12 | 首頁橫幅(2) + 關於區塊(1) + 優勢(4) + 公司簡介(1) + 政策(4) |
| Courses | 7 | 實體課程(5) + 線上課程(2) |
| News | 6 | 農產新知(2) + 新聞媒體(2) + 常見問題(2) |
| Downloads | 6 | 品質管理(2) + 農產品驗證(2) + ESG 查驗(2) |
| Certificates | 4 | 有效(2) + 過期(1) + 審核中(1) |
| Recruitment | 3 | 驗證部(1) + 農產品部(1) + 永續部(1) |

---

## 6. 資料模型

### Content（內容）

```typescript
{
  id: string;               // 例: 'hero-banner', 'advantage-1', 'policy-quality'
  section: 'homepage' | 'about';
  type: 'banner' | 'hero-image' | 'about' | 'advantage' | 'company-intro' | 'policy';
  title: string;
  subtitle?: string;
  body?: string;
  mediaType?: 'video' | 'image';
  mediaUrl?: string;
  order?: number;            // 排序用（advantage: 1-4, policy: 1-4）
  updatedAt: string;         // ISO 8601
}
```

### Course（課程）

```typescript
{
  id: string;                // 例: 'C-001'
  title: string;
  type: 'physical' | 'online' | 'videos' | 'corporate';
  category: '品質管理' | '農產品驗證' | 'ESG查驗';
  date: string;              // ISO 8601 日期
  status: '報名中' | '即將開課' | '草稿';
  students: number;          // 目前報名人數
  maxStudents: number;       // 上限人數
  description?: string;
  createdAt: string;
  updatedAt: string;
}
```

### News（新聞）

```typescript
{
  id: string;                // 例: 'N-001'
  title: string;
  category: '農產新知' | '新聞媒體' | '常見問題';
  status: '已發布' | '草稿';
  author: string;
  date: string;              // ISO 8601 日期
  views: number;
  body: string;              // 文章內容
  createdAt: string;
  updatedAt: string;
}
```

### Download（下載）

```typescript
{
  id: string;                // 例: 'D-001'
  name: string;
  category: '品質管理' | '農產品驗證' | 'ESG查驗';
  format: 'PDF' | string;
  size: string;              // 例: '1.2 MB'
  downloads: number;         // 下載次數
  fileUrl: string;           // 檔案 URL（S3 或 '#' 佔位）
  createdAt: string;
  updatedAt: string;
}
```

### Certificate（證書）

```typescript
{
  id: string;                // 例: 'T-2024-001'
  name: string;              // 公司/農場名稱
  type: '有機驗證農糧' | '產銷履歷水產' | '產銷履歷農產' | '產銷履歷蜂產';
  issueDate: string;         // 核發日期
  status: 'active' | 'expired' | 'pending';
  createdAt: string;
  updatedAt: string;
}
```

### Recruitment（招募）

```typescript
{
  id: string;                // 例: 'R-001'
  title: string;             // 職缺名稱
  department: '驗證部' | '農產品部' | '永續部';
  type: '全職' | string;
  status: '招募中' | string;
  applicants: number;        // 應徵人數
  createdAt: string;
  updatedAt: string;
}
```

---

## 7. 樣式系統

### Tailwind CSS 配置

**色彩系統：**

```
magpie-primary   #00338D   主色（深藍）— 標題、按鈕、連結
magpie-dark      #001b4c   深色 — 頁尾、側邊欄、主視覺背景
magpie-light     #0059b3   亮色 — 活動狀態
magpie-lighter   #e6ebf3   淺色 — 背景色、標籤底色
magpie-accent    #FF3366   強調色（紅）— 裝飾元素、分隔線
magpie-hover     #00266e   懸停色 — 按鈕懸停狀態
```

**字型系統：**

```
sans     "Noto Sans TC", sans-serif    — 正文、UI 元素
display  "Playfair Display", serif     — 裝飾性標題
```

**自訂工具類別：**

```css
.bg-grid-pattern    /* 40px 方格背景（課程區塊使用） */
```

### 響應式斷點

遵循 Tailwind 預設斷點：
- 預設：手機（< 768px）
- `md:`：平板（>= 768px）
- `lg:`：桌面（>= 1024px）

---

## 8. 建置與部署

### 8.1 開發環境

```bash
# 安裝依賴
npm install

# 植入種子資料（首次執行）
npm run seed

# 啟動前端開發伺服器 (Vite, port 5173)
npm run dev

# 啟動 API 開發伺服器 (Express, port 3001)
npm run dev:api
```

### 8.2 建置流程

```bash
# 前端建置：TypeScript 編譯 + Vite 打包 → dist/
npm run build

# 後端建置：TypeScript 編譯 → dist-api/
npm run build:api
```

**前端建置產出：**
```
dist/
├── index.html          (0.68 KB)
└── assets/
    ├── index-*.css      (~47 KB, gzip ~8 KB)
    └── index-*.js       (~299 KB, gzip ~83 KB)
```

### 8.3 AWS 部署架構

```
┌─────────────────────────────────────────────────┐
│                  AWS Cloud                       │
│                                                  │
│   ┌────────────┐     ┌──────────────────────┐   │
│   │ CloudFront │────▶│ S3 Bucket            │   │
│   │ CDN        │     │ (dist/ 靜態檔案)       │   │
│   └────────────┘     └──────────────────────┘   │
│                                                  │
│   ┌─────────────┐    ┌──────────────────────┐   │
│   │ API Gateway │───▶│ Lambda Function      │   │
│   │ (HTTP API)  │    │ (dist-api/lambda.js)  │   │
│   │ /api/*      │    │ Node.js 20.x         │   │
│   └─────────────┘    │ 512MB / 30s timeout  │   │
│                      └───────────┬──────────┘   │
│                                  │               │
│                      ┌───────────▼──────────┐   │
│                      │ DynamoDB             │   │
│                      │ 6 tables             │   │
│                      │ PAY_PER_REQUEST      │   │
│                      │ Region: ap-northeast-1│  │
│                      └──────────────────────┘   │
└─────────────────────────────────────────────────┘
```

**部署指令：**

```bash
# 部署 API（Serverless Framework）
npm run deploy:api
# 等同：npm run build:api && npx serverless deploy --stage prod

# 部署前端（S3 + CloudFront）
npm run deploy:frontend
# 等同：npm run build && aws s3 sync dist/ s3://$BUCKET/ --delete
#        && aws cloudfront create-invalidation --distribution-id $CF_DIST --paths '/*'

# 全部部署
npm run deploy
```

**Serverless Framework 設定要點** (`serverless.yml`)：
- 服務名稱：`magpiecert-api`
- 執行環境：Node.js 20.x
- 區域：`ap-northeast-1`（東京）
- Lambda：單一函式處理所有 `/api/*` 路由
- IAM：DynamoDB 全操作權限（PutItem、GetItem、UpdateItem、DeleteItem、Scan、Query）
- 輸出：API Gateway URL（`HttpApi.ApiEndpoint`）

**AWS Amplify 設定** (`amplify.yml`)：
- 建置階段：`npm ci` → `npm run build`
- 產出目錄：`dist/`
- 快取：`node_modules/**/*`
- 標頭：assets 目錄 1 年不可變快取，其餘 `max-age=0, must-revalidate`

### 8.4 環境變數

| 變數 | 用途 | 預設值 |
|------|------|--------|
| `VITE_API_URL` | 前端 API 基礎 URL | `http://localhost:3001/api` |
| `AWS_REGION` | AWS 區域 | `ap-northeast-1` |
| `AWS_ACCESS_KEY_ID` | AWS 存取金鑰 | — |
| `AWS_SECRET_ACCESS_KEY` | AWS 密鑰 | — |
| `ADMIN_USER` | 管理員帳號 | `admin` |
| `ADMIN_PASS` | 管理員密碼 | `magpie2025` |
| `CONTENT_TABLE` | DynamoDB 內容資料表名 | `magpiecert-api-content-prod` |
| `COURSES_TABLE` | DynamoDB 課程資料表名 | `magpiecert-api-courses-prod` |
| `NEWS_TABLE` | DynamoDB 新聞資料表名 | `magpiecert-api-news-prod` |
| `DOWNLOADS_TABLE` | DynamoDB 下載資料表名 | `magpiecert-api-downloads-prod` |
| `CERTIFICATES_TABLE` | DynamoDB 證書資料表名 | `magpiecert-api-certificates-prod` |
| `RECRUITMENT_TABLE` | DynamoDB 招募資料表名 | `magpiecert-api-recruitment-prod` |
| `PORT` | API 伺服器埠號（本地） | `3001` |

---

## 9. 靜態資源

### public/assets/

| 檔案 | 大小 | 用途 |
|------|------|------|
| `hero_tech_bg_1775051016062.png` | 604 KB | Hero 區塊科技背景 |
| `hero_bg_1775047483663.png` | 933 KB | Hero 區塊農業背景 |
| `about_greenhouse_1775051032770.png` | 924 KB | 關於藍鵲溫室圖片 |
| `service_agri_1775047500817.png` | 1.1 MB | 農產品驗證服務卡片 |
| `service_system_1775047557038.png` | 698 KB | 管理系統驗證服務卡片 |
| `magpiecert_full_page_1775046941679.png` | 1.9 MB | 完整頁面設計參考 |
| `magpiecert_news_section_1775046977763.png` | 701 KB | 新聞區塊設計參考 |
| `figma_prototype_full_1775048337083.png` | 875 KB | Figma 原型完整截圖 |
| `figma_prototype_initial_1775048330697.png` | 878 KB | Figma 原型初版截圖 |
| `rendering_error_screenshot_1775048056023.png` | 113 KB | 除錯用截圖 |

### 外部圖片資源

部分元件使用 Unsplash 圖片作為佔位：
- Hero 農業背景
- 課程區塊教育訓練圖片
- 新聞卡片圖片
- CtaBanner 背景

---

## 10. 設計模式與慣例

### 元件模式

- **函式元件**：全部使用 `React.FC` 型別
- **受控表單**：所有表單輸入使用 `useState` 管理
- **彈窗 CRUD**：後台管理頁面統一使用 Modal 進行新增/編輯
- **條件渲染**：使用 `&&` 短路運算與三元運算子

### 狀態管理

- **React Context**：僅用於身份驗證（AuthContext）
- **useState**：元件內部狀態
- **useEffect**：API 資料載入與副作用
- **URL 參數**：`useParams()` 用於路由型篩選（課程類型、新聞分類）

### API 模式

- **RESTful 設計**：資源導向的 URL + 標準 HTTP 動詞
- **統一錯誤處理**：`try/catch` + `500 { error: message }`
- **自動欄位**：新增時自動產生 `id`（UUID）、`createdAt`、`updatedAt`
- **通用資料存取**：`putItem` / `getItem` / `scanItems` / `updateItem` / `deleteItem`

### 命名慣例

- **檔案名稱**：PascalCase（元件）、camelCase（服務/工具）
- **路由參數**：`/courses/:type`、`/news/:type`、`/content/:section/:id`
- **CSS 類別**：Tailwind 原子化類別，自訂色彩以 `magpie-` 前綴
- **資料 ID**：分類前綴 + 流水號（`C-001`、`N-001`、`D-001`、`T-2024-001`、`R-001`）

### 安全性

- **路由守衛**：`ProtectedRoute` 包裹所有後台路由
- **Session 儲存**：使用 `sessionStorage`（關閉瀏覽器即失效）
- **CORS**：後端啟用跨域支援
- **環境變數**：敏感資訊不寫入程式碼

---

## 11. 程式碼統計

### 各檔案行數

| 分類 | 檔案 | 行數 |
|------|------|------|
| **進入點** | main.tsx | 8 |
| | App.tsx | 90 |
| | index.css | 21 |
| **前台元件** | Navbar.tsx | 82 |
| | Footer.tsx | 84 |
| | Hero.tsx | 41 |
| | AboutUs.tsx | 59 |
| | Advantages.tsx | 61 |
| | Services.tsx | 82 |
| | HomeCourses.tsx | 110 |
| | News.tsx | 78 |
| | CtaBanner.tsx | 33 |
| | ProtectedRoute.tsx | 23 |
| | Layout.tsx | 189 |
| **前台頁面** | Home.tsx | 22 |
| | About.tsx | 180 |
| | Services.tsx | 163 |
| | CertificateSearch.tsx | 121 |
| | Education.tsx | 253 |
| | Downloads.tsx | 97 |
| | News.tsx | 156 |
| | Contact.tsx | 124 |
| **後台頁面** | Login.tsx | 112 |
| | Dashboard.tsx | 75 |
| | HomepageManage.tsx | 131 |
| | AboutManage.tsx | 295 |
| | CourseManage.tsx | 256 |
| | Certificates.tsx | 208 |
| | NewsManage.tsx | 209 |
| | DownloadManage.tsx | 219 |
| | RecruitmentManage.tsx | 219 |
| | ContentManage.tsx | 117 |
| **狀態/服務** | AuthContext.tsx | 78 |
| | AdminLayout.tsx | 170 |
| | api.ts | 68 |
| **後端** | server.ts | 354 |
| | local-db.ts | 104 |
| | dynamodb.ts | 75 |
| | lambda.ts | 4 |
| | seed.ts | 111 |
| **總計** | **37 個原始碼檔案** | **4,861** |

### 分類統計

| 分類 | 行數 | 佔比 |
|------|------|------|
| 前台元件 + 頁面 | 1,958 | 40.3% |
| 後台管理頁面 | 1,841 | 37.9% |
| 後端 API | 648 | 13.3% |
| 版面/路由/服務/狀態 | 414 | 8.5% |

---

> **文件結束** — 本文件涵蓋藍鵲驗證官網的完整技術架構，包含前後端設計、資料模型、部署流程與開發慣例。如有任何架構變動，請同步更新此文件。
