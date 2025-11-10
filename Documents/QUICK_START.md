# ⚡ 快速開始

## 🎯 新增報告 - 3 步驟

### 1️⃣ 打開數據文件

```bash
app/data/reportsData.ts
```

### 2️⃣ 添加報告數據

在 `reportsData` 陣列最後添加：

```typescript
{
  id: 'your-report-id',           // 唯一 ID
  title: '你的報告標題',
  icon: '🎯',                     // 選個 emoji
  reportTime: '2025-11-10 16:00:00',

  overview: {
    total: 50,                    // 活動總數
    dateRange: '日期範圍',
    avgInterval: 2.0,             // 平均間隔
    avgMonthly: 15.0,             // 月均活動
    days: 90                      // 天數
  },

  onlineVsOffline: [
    { type: '線下活動', count: 45, avgView: 692, avgLike: 12 },
    { type: '線上活動', count: 5, avgView: 217, avgLike: 10 }
  ],

  categoryData: [
    { name: '分類1', view: 1000, like: 20, count: 10 },
    // ... 更多分類
  ],

  topTags: [
    { name: '標籤1', count: 5, view: 500, like: 10 },
    // ... 更多標籤
  ],

  tagCombinations: [
    '標籤1 + 標籤2 (3場)',
    '標籤3 + 標籤4 (2場)'
  ],

  weekdayData: [
    { day: '星期一', count: 5, view: 300, like: 8 },
    // ... 其他星期
  ],

  monthlyData: [
    { month: '2025-11', count: 30, percentage: 60 },
    // ... 其他月份
  ],

  weekdayVsWeekend: [
    { type: '平日', count: 20, percentage: 40 },
    { type: '假日', count: 30, percentage: 60 }
  ],

  mostPopularDay: {
    day: '星期六',
    count: 15
  },

  topEvents: [
    { title: '活動標題', rate: 6.5 },
    // ... 更多活動
  ],

  titleKeywords: ['關鍵字1', '關鍵字2', '關鍵字3'],

  market: {
    redOcean: [
      { name: '標籤1', count: 10 },
      // ... 更多
    ],
    blueOcean: [
      { name: '標籤2', count: 2 },
      // ... 更多
    ],
    learningSubmarket: [
      { name: '細分1', count: 5 },
      // ... 更多
    ],
    insights: [
      '洞察1',
      '洞察2'
    ]
  }
}
```

### 3️⃣ 完成！

刷新瀏覽器 → 看到新報告按鈕 → 點擊查看

---

## 📋 數據欄位說明

| 欄位                  | 類型   | 說明       | 範例                       |
| --------------------- | ------ | ---------- | -------------------------- |
| `id`                  | string | 唯一識別碼 | `'sports'`                 |
| `title`               | string | 報告標題   | `'運動類活動數據分析報告'` |
| `icon`                | string | emoji 圖標 | `'⚽'`                     |
| `reportTime`          | string | 報告時間   | `'2025-11-10 16:00:00'`    |
| `overview.total`      | number | 活動總數   | `50`                       |
| `overview.days`       | number | 涵蓋天數   | `90`                       |
| `categoryData[].view` | number | 平均觀看數 | `1000`                     |
| `topEvents[].rate`    | number | 互動率(%)  | `6.5`                      |

---

## 🎨 自訂按鈕顏色

在 `app/reports/page.tsx` 中修改：

```typescript
// 1. 添加顏色映射
const colorMap: Record<string, string> = {
  learning: "blue",
  arts: "purple",
  experience: "green",
  "your-report-id": "red", // 👈 新增這行
};

// 2. 添加顏色值
backgroundColor: color === "blue"
  ? "#2563eb"
  : color === "purple"
  ? "#9333ea"
  : color === "green"
  ? "#16a34a"
  : color === "red"
  ? "#dc2626" // 👈 新增這行
  : "#2563eb";
```

---

## 🚀 啟動專案

```bash
# 安裝依賴（首次）
npm install

# 啟動開發伺服器
npm run dev

# 開啟瀏覽器
http://localhost:3000
```

---

## 📞 需要幫助？

- 📖 **詳細教學**: `HOW_TO_ADD_REPORT.md`
- 🏗️ **架構說明**: `ARCHITECTURE_UPDATE.md`
- **專案說明**: `REPORTS_README.md`
- 💻 **類型定義**: `app/types/report.ts`

---

**提示**：複製現有報告數據，修改內容即可！
