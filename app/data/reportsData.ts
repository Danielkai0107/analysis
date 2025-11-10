import { ReportData } from "../types/report";

export const reportsData: ReportData[] = [
  // 學習類活動數據分析報告
  {
    id: "learning",
    title: "學習類活動數據分析報告",
    icon: "",
    reportTime: "2025-11-10 14:43:47",
    overview: {
      total: 50,
      dateRange: "2025-11-04 至 2026-02-10",
      avgInterval: 1.9,
      avgMonthly: 15.3,
      days: 98,
    },
    onlineVsOffline: [
      {
        type: "線下活動",
        count: 36,
        avgView: 822,
        avgLike: 6,
      },
      {
        type: "線上活動",
        count: 13,
        avgView: 320,
        avgLike: 10,
      },
    ],
    categoryData: [
      {
        name: "線上活動",
        view: 320,
        like: 10,
        count: 13,
      },
      {
        name: "學習",
        view: 651,
        like: 8,
        count: 40,
      },
      {
        name: "科技",
        view: 2313,
        like: 28,
        count: 5,
      },
      {
        name: "線下活動",
        view: 822,
        like: 6,
        count: 36,
      },
      {
        name: "健康",
        view: 3404,
        like: 13,
        count: 3,
      },
      {
        name: "商業",
        view: 299,
        like: 3,
        count: 13,
      },
      {
        name: "創業",
        view: 127,
        like: 3,
        count: 6,
      },
      {
        name: "戶外體驗",
        view: 1821,
        like: 8,
        count: 1,
      },
      {
        name: "藝文",
        view: 208,
        like: 7,
        count: 6,
      },
      {
        name: "美食",
        view: 394,
        like: 11,
        count: 1,
      },
    ],
    topTags: [
      {
        name: "職場",
        count: 3,
        view: 3595,
        like: 19,
      },
      {
        name: "科技",
        count: 2,
        view: 3098,
        like: 20,
      },
      {
        name: "AI",
        count: 10,
        view: 1016,
        like: 9,
      },
      {
        name: "自我成長",
        count: 2,
        view: 659,
        like: 13,
      },
      {
        name: "讀書會",
        count: 2,
        view: 634,
        like: 12,
      },
      {
        name: "行銷",
        count: 2,
        view: 470,
        like: 9,
      },
      {
        name: "消費趨勢",
        count: 2,
        view: 436,
        like: 2,
      },
      {
        name: "溝通",
        count: 2,
        view: 422,
        like: 10,
      },
      {
        name: "自媒體",
        count: 3,
        view: 369,
        like: 6,
      },
    ],
    tagCombinations: [
      "AI + 簡報                             3 場",
      "溝通 + 職場                             2 場",
      "AI + 行銷                             2 場",
    ],
    weekdayData: [
      {
        day: "星期一",
        count: 1,
        view: 32,
        like: 1,
      },
      {
        day: "星期二",
        count: 4,
        view: 150,
        like: 8,
      },
      {
        day: "星期三",
        count: 8,
        view: 438,
        like: 4,
      },
      {
        day: "星期四",
        count: 4,
        view: 341,
        like: 3,
      },
      {
        day: "星期五",
        count: 5,
        view: 196,
        like: 2,
      },
      {
        day: "星期六",
        count: 17,
        view: 1058,
        like: 12,
      },
      {
        day: "星期日",
        count: 10,
        view: 929,
        like: 7,
      },
    ],
    monthlyData: [
      {
        month: "2026-02",
        count: 1,
        percentage: 2,
      },
      {
        month: "2026-01",
        count: 2,
        percentage: 4,
      },
      {
        month: "2025-12",
        count: 19,
        percentage: 38,
      },
      {
        month: "2025-11",
        count: 30,
        percentage: 60,
      },
    ],
    weekdayVsWeekend: [
      {
        type: "平日",
        count: 22,
        percentage: 44,
      },
      {
        type: "假日",
        count: 28,
        percentage: 56,
      },
    ],
    mostPopularDay: {
      day: "星期六",
      count: 17,
    },
    topEvents: [
      {
        title: "藝術治療系統式學習小組（線上）2025年第三梯次",
        rate: 6.18,
      },
      {
        title:
          "RPAI 實體聚：Demo 速成不 emo，帶你從 0 到 1 玩轉 Gemini × Google Apps Scri",
        rate: 5.71,
      },
      {
        title: "【戒掉背單字】解析你的外語學習｜日文、英文、韓文都適用！",
        rate: 4.4,
      },
      {
        title:
          "AI 時代的外貿曝光術：LinkedIn 引流 × 維基百科多語入口 × 媒體知名度_11月場",
        rate: 4.35,
      },
      {
        title: "系統正念領導力",
        rate: 3.75,
      },
      {
        title: "ChatGPT & Lovable 入門講座 ｜用 AI 打造你的第一個 MVP",
        rate: 3.35,
      },
      {
        title: "占星療心系列講座--掌握行運三王星世界新趨勢與通關密碼",
        rate: 3.12,
      },
      {
        title:
          "🚀 衝破迷茫，啟動你的職場晉升引擎！ 【LEGO® SERIOUS PLAY® 樂高認真玩工作坊】",
        rate: 3.1,
      },
      {
        title: "【台北場】室內市集｜網路創業｜網購好物分享會",
        rate: 2.79,
      },
      {
        title: "【訓練功能實務】螺旋/張力結構訓練（台北）",
        rate: 2.64,
      },
    ],
    titleKeywords: [
      "台北",
      "打造你的",
      "美業行銷",
      "職場不心",
      "主題講座",
      "首度集結",
      "三位諮商",
      "心理師蘇",
    ],
    market: {
      redOcean: [
        {
          name: "AI",
          count: 10,
        },
        {
          name: "創業",
          count: 4,
        },
        {
          name: "簡報",
          count: 4,
        },
        {
          name: "工作坊",
          count: 3,
        },
        {
          name: "職場",
          count: 3,
        },
        {
          name: "自媒體",
          count: 3,
        },
      ],
      blueOcean: [
        {
          name: "創業",
          count: 4,
        },
        {
          name: "簡報",
          count: 4,
        },
        {
          name: "工作坊",
          count: 3,
        },
        {
          name: "職場",
          count: 3,
        },
        {
          name: "自媒體",
          count: 3,
        },
      ],
      learningSubmarket: [
        {
          name: "AI",
          count: 8,
        },
        {
          name: "職場",
          count: 3,
        },
        {
          name: "自媒體",
          count: 3,
        },
        {
          name: "簡報",
          count: 3,
        },
        {
          name: "學習",
          count: 3,
        },
        {
          name: "工作坊",
          count: 2,
        },
        {
          name: "溝通",
          count: 2,
        },
        {
          name: "行銷",
          count: 2,
        },
      ],
      insights: [
        "假日活動佔比較高，週末是主要活動時段",
        "AI相關活動競爭最激烈",
        "創業、簡報、工作坊等領域競爭較低，有發展空間",
      ],
    },
  },
];
