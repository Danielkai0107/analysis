// 報告數據類型定義

export interface CategoryData {
  name: string;
  view: number;
  like: number;
  count: number;
}

export interface TagData {
  name: string;
  count: number;
  view: number;
  like: number;
}

export interface WeekdayData {
  day: string;
  count: number;
  view: number;
  like: number;
}

export interface MonthlyData {
  month: string;
  count: number;
  percentage: number;
}

export interface OnlineVsOfflineData {
  type: string;
  count: number;
  avgView: number;
  avgLike: number;
}

export interface WeekdayVsWeekendData {
  type: string;
  count: number;
  percentage: number;
}

export interface TopEventData {
  title: string;
  rate: number;
}

export interface MarketItemData {
  name: string;
  count: number;
}

export interface ReportData {
  // 基本資訊
  id: string;
  title: string;
  icon: string;
  reportTime: string;
  
  // 總覽數據
  overview: {
    total: number;
    dateRange: string;
    avgInterval: number;
    avgMonthly: number;
    days: number;
  };
  
  // 線上線下數據
  onlineVsOffline: OnlineVsOfflineData[];
  
  // 分類數據
  categoryData: CategoryData[];
  
  // 標籤數據
  topTags: TagData[];
  tagCombinations: string[];
  
  // 時間數據
  weekdayData: WeekdayData[];
  monthlyData: MonthlyData[];
  weekdayVsWeekend: WeekdayVsWeekendData[];
  mostPopularDay: {
    day: string;
    count: number;
  };
  
  // 內容吸引力
  topEvents: TopEventData[];
  titleKeywords: string[];
  
  // 市場機會
  market: {
    redOcean: MarketItemData[];
    blueOcean: MarketItemData[];
    learningSubmarket: MarketItemData[];
    insights: string[];
  };
}

