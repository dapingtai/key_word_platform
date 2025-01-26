# Audio Processing API

## 技術架構
### 使用的程式語言及框架
- Python
- FastAPI - 現代化、高效能的 Web 框架
- faster-whisper - 用於語音辨識的 Whisper 模型優化實現
- CUDA - GPU 加速支援

### 專案結構
```
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── audio_routes.py    # API 路由處理
│   ├── core/
│   │   └── config.py             # 系統設定
│   ├── model/
│   │   └── sound/
│   │       └── use_whisper.py    # 語音辨識模型
│   └── main.py                   # 應用程式入口
├── files/
│   ├── input/                    # 音檔上傳目錄
│   └── output/                   # 輸出結果目錄
└── run.py                        # 啟動腳本
```

## 安裝指南

### 系統需求
- Python 3.8 或以上
- CUDA 支援的 GPU（建議用於更佳效能）

### 安裝步驟

1. 複製專案
```bash
git clone [repository-url]
cd [project-directory]
```

2. 安裝相依套件
```bash
pip install -r requirements.txt
```

3. 環境設定
- 建立 `.env` 檔案並設定環境變數
```
ENVIRONMENT=sit  # 可選: sit, uat, prod
```
### Environment Features

- **SIT (System Integration Testing)**
  - Debug mode enabled
  - Hot reload enabled
  - Single worker

- **UAT (User Acceptance Testing)**
  - Debug mode enabled
  - Hot reload enabled
  - Single worker

- **PROD (Production)**
  - Debug mode disabled
  - Hot reload disabled
  - Multiple workers (4)

## 啟動方式
```bash
python run.py
```
服務預設會在 http://localhost:8000 啟動

## API 文件
安裝完成後可訪問 http://localhost:8000/docs 查看完整 API 文件

## 核心功能介紹

### 1. 音檔上傳
- 端點: `/api/v1/audio/upload`
- 方法: POST
- 功能: 上傳音訊檔案至系統

### 2. 音訊分析
- 端點: `/api/v1/audio/analysis`
- 方法: GET
- 功能: 使用 Whisper 模型進行語音辨識
- 特點:
  - 支援多種模型大小 (tiny, base, small, medium, large-v2, large-v3)
  - GPU 加速支援
  - 支援多種輸出格式:
    - normal: 一般文本輸出
    - timeline: 包含時間軸資訊
    - subtitle: 字幕檔格式

### 3. 音訊檔案查詢
- 端點: `/api/v1/audio/item/{item_id}`
- 方法: GET
- 功能: 查詢特定音訊檔案資訊

## 注意事項
- 確保有足夠的硬碟空間存放上傳的音檔
- 使用 GPU 模式時，請確認 CUDA 環境設定正確
- 檔案上傳大小限制依據系統設定而定