# Voice-Enabled Search Interface

這是一個基於SolidJS開發的語音搜尋介面應用程式，能夠進行語音輸入並與文字進行比對分析。使用者可以輸入英文句子，然後透過語音方式說出該句子，系統會分析語音內容並與原始文字進行比對，提供相似度分數。

## 技術架構

- 前端框架: SolidJS 1.7.0
- 開發語言: TypeScript 5.0.0
- 建置工具: Vite 4.3.0
- UI組件: 自定義組件
- 路由系統: @solidjs/router 0.15.2

## 專案結構

```
src/
├── components/     # 可重用的UI組件，如Modal和Navbar
├── page/          # 頁面組件，包含主要的SearchInterface
├── styles/        # CSS樣式文件
└── types/         # TypeScript類型定義
```

## 安裝指南

### 系統需求

- Node.js v14.0.0 或以上版本
- npm 或 yarn 套件管理工具
- 支援錄音功能的瀏覽器

### 安裝步驟

1. Clone 專案到本地：
```bash
git clone [repository_url]
cd voice-search-interface
```

2. 安裝相依套件：
```bash
npm install
# 或使用 yarn
yarn install
```

### 啟動應用程式

1. 開發模式：
```bash
npm run dev
# 或使用 yarn
yarn dev
```

2. 編譯建置：
```bash
npm run build
# 或使用 yarn
yarn build
```

3. 預覽建置結果：
```bash
npm run serve
# 或使用 yarn
yarn serve
```

應用程式預設會在 `http://localhost:3000` 運行。

## 使用說明與功能介紹

### 基本使用流程

1. 在搜尋框中輸入要練習的英文句子
2. 點擊麥克風按鈕(🎤)開始錄音
3. 說出輸入的英文句子
4. 再次點擊麥克風按鈕停止錄音
5. 點擊分析按鈕(📝)上傳並分析錄音
6. 在彈出視窗中查看分析結果及比對分數

### 主要功能詳解

1. **語音錄製功能**
   - 使用Web Audio API進行音頻錄製
   - 透過MediaRecorder API實現錄音功能
   - 支援音頻串流的收集和處理
   - 提供直觀的錄音界面和狀態顯示
   - 實現於SearchInterface.tsx的startRecording()函數

2. **音頻播放控制**
   - 支援錄音的播放和暫停
   - 提供音頻播放狀態管理
   - 可同時管理多個錄音檔案
   - 包含音量控制和進度顯示
   - 實現於SearchInterface.tsx的togglePlayback()函數

3. **語音分析功能**
   - 將錄音上傳至後端進行分析
   - 支援音檔格式轉換(WAV格式)
   - 提供上傳進度顯示
   - 即時處理分析結果
   - 實現於SearchInterface.tsx的uploadRecording()和analysisRecording()函數

4. **文字比對功能**
   - 比較語音識別結果與目標文字的相似度
   - 提供詳細的分析結果顯示
   - 計算並展示文字匹配分數
   - 標示關鍵字差異
   - 實現於SearchInterface.tsx的matchTextScore()函數

### 進階功能特色

- **搜尋介面**
  - 提供類Google的搜尋框介面
  - 支援文字輸入和語音輸入
  - 整合直觀的導航欄(Navbar)組件

- **錄音管理**
  - 顯示所有錄音的列表
  - 每個錄音項目包含時間標記和原始文字
  - 支援播放、暫停和分析操作

- **分析結果展示**
  - 使用Modal組件顯示分析結果
  - 提供上傳進度指示
  - 顯示文字匹配分數和分析時間

## API 端點說明

應用程式需要連接到後端 API 服務，預設的 API 端點為：

- **上傳音檔**：POST http://localhost:3000/api/v1/audio/upload
  - 參數：audio_file (WAV格式音檔)
  - 參數：searchText (比對用文字)

- **分析音檔**：GET http://localhost:3000/api/v1/audio/analysis
  - 參數：filename (音檔名稱)

## 瀏覽器支援

- Google Chrome (建議)
- Firefox
- Safari
- Edge

請確保瀏覽器已開啟麥克風權限，才能正常使用錄音功能。