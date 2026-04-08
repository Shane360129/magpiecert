#!/bin/bash
# ============================================
# 藍鵲驗證官網 - AWS S3 + CloudFront 部署腳本
# ============================================
#
# 使用前請先設定：
# 1. 安裝 AWS CLI: https://aws.amazon.com/cli/
# 2. 執行 aws configure 設定 Access Key
# 3. 修改下方變數為您的 S3 bucket 和 CloudFront distribution ID
#
# ============================================

# === 設定區 ===
S3_BUCKET="your-bucket-name"              # 替換為您的 S3 bucket 名稱
CLOUDFRONT_DIST_ID="your-distribution-id"  # 替換為您的 CloudFront distribution ID
REGION="ap-northeast-1"                     # AWS 區域 (東京)
# ==============

set -e

echo "🔨 Building project..."
npm run build

echo "📤 Uploading to S3..."
aws s3 sync dist/ s3://$S3_BUCKET/ \
  --region $REGION \
  --delete

# 設定 HTML 不快取
aws s3 cp dist/index.html s3://$S3_BUCKET/index.html \
  --region $REGION \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html"

# 設定靜態資源長快取
aws s3 sync dist/assets/ s3://$S3_BUCKET/assets/ \
  --region $REGION \
  --cache-control "public, max-age=31536000, immutable"

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DIST_ID \
  --paths "/*"

echo "✅ Deployment complete!"
