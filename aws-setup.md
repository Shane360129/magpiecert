# AWS 完整部署指南 - 藍鵲驗證官網

## 架構概覽

```
使用者 → CloudFront (CDN) → S3 (前端靜態檔案)
          ↓
管理員 → API Gateway → Lambda (後端 API) → DynamoDB (雲端資料庫)
```

| 元件 | AWS 服務 | 說明 |
|------|---------|------|
| 前端 | S3 + CloudFront | React SPA 靜態檔案 |
| 後端 API | Lambda + API Gateway | Express.js REST API |
| 資料庫 | DynamoDB | NoSQL 雲端資料庫 |
| 檔案儲存 | S3 | 文件下載、圖片上傳 |

---

## 前置準備

### 1. 安裝 AWS CLI

**Windows:**
下載安裝: https://awscli.amazonaws.com/AWSCLIV2.msi

**Mac:**
```bash
brew install awscli
```

### 2. 建立 AWS IAM 使用者

1. 登入 AWS Console → IAM → 使用者 → 建立使用者
2. 附加權限政策:
   - `AmazonDynamoDBFullAccess`
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
   - `AWSLambda_FullAccess`
   - `AmazonAPIGatewayAdministrator`
   - `AWSCloudFormationFullAccess`
   - `IAMFullAccess` (Serverless 需要)
3. 建立存取金鑰 (Access Key)

### 3. 設定 AWS 認證

```bash
aws configure
# AWS Access Key ID: 貼上 Access Key
# AWS Secret Access Key: 貼上 Secret Key
# Default region: ap-northeast-1
# Default output format: json
```

### 4. 設定環境變數

```bash
cp .env.example .env
# 編輯 .env 填入您的 AWS 認證資訊
```

---

## 部署步驟

### 步驟一：部署後端 API + 建立 DynamoDB 資料表

```bash
# 編譯後端 TypeScript
npm run build:api

# 使用 Serverless Framework 部署
npm run deploy:api
```

部署完成後會顯示 API Gateway URL，例如:
```
endpoints:
  ANY - https://abc123xyz.execute-api.ap-northeast-1.amazonaws.com/api
```

### 步驟二：設定前端 API URL

將 API Gateway URL 加入 `.env`:
```
VITE_API_URL=https://abc123xyz.execute-api.ap-northeast-1.amazonaws.com/api
```

### 步驟三：初始化資料庫

```bash
npm run seed
```

### 步驟四：建立 S3 Bucket 並部署前端

```bash
# 建立 S3 bucket
aws s3 mb s3://magpiecert-website --region ap-northeast-1

# 編譯並上傳前端
npm run build
aws s3 sync dist/ s3://magpiecert-website/ --delete
```

### 步驟五：建立 CloudFront Distribution

在 AWS Console:
1. CloudFront → 建立分配
2. Origin: `magpiecert-website.s3.ap-northeast-1.amazonaws.com`
3. Origin Access: OAC (Origin Access Control)
4. Default root object: `index.html`
5. **Custom Error Response** (SPA 必要):
   - 403 → /index.html (200)
   - 404 → /index.html (200)
6. 啟用 HTTPS

---

## 資料表結構

### magpiecert-content (首頁/關於我們)
| 欄位 | 類型 | 說明 |
|------|------|------|
| id | String (PK) | 唯一識別碼 |
| section | String | 頁面區塊 (homepage/about) |
| type | String | 內容類型 |
| title | String | 標題 |
| body | String | 內文 |
| mediaUrl | String | 圖片/影片 URL |
| updatedAt | String | 更新時間 |

### magpiecert-courses (教育訓練)
| 欄位 | 類型 | 說明 |
|------|------|------|
| id | String (PK) | 唯一識別碼 |
| title | String | 課程名稱 |
| type | String | physical/online/videos/corporate |
| category | String | 品質管理/農產品驗證/ESG查驗 |
| date | String | 日期 |
| status | String | 報名中/即將開課/已結束 |
| students | Number | 報名人數 |

### magpiecert-news (最新消息)
| 欄位 | 類型 | 說明 |
|------|------|------|
| id | String (PK) | 唯一識別碼 |
| title | String | 標題 |
| category | String | 農產新知/新聞媒體/常見問題 |
| status | String | 已發布/草稿 |
| views | Number | 瀏覽數 |
| body | String | 內文 |

---

## 費用估算 (月)

| 項目 | 估算費用 |
|------|---------|
| DynamoDB (隨用隨付) | $1-5 |
| Lambda (100萬次請求免費) | $0-2 |
| API Gateway | $0-3 |
| S3 儲存 | $0.5-1 |
| CloudFront (1TB 免費) | $0-5 |
| **總計** | **$1.5-16 USD/月** |

---

## 常用指令

```bash
# 本地開發
npm run dev          # 前端 (port 5173)
npm run dev:api      # 後端 API (port 3001)

# 部署
npm run deploy:api       # 部署後端
npm run deploy:frontend  # 部署前端
npm run deploy           # 全部部署

# 資料庫
npm run seed             # 初始化資料
```
