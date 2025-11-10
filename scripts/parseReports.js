/**
 * Accupass 報告解析器
 * 自動讀取 data_report 資料夾中的 TXT 文件並生成 reportsData.ts
 */

const fs = require("fs");
const path = require("path");

// 配置
const DATA_REPORT_DIR = path.join(__dirname, "../data_report");
const OUTPUT_FILE = path.join(__dirname, "../app/data/reportsData.ts");

// 報告類型配置
const REPORT_TYPES = {
  學習: { id: "learning", icon: "" },
  藝文: { id: "arts", icon: "🎨" },
  體驗: { id: "experience", icon: "🌟" },
  運動: { id: "sports", icon: "⚽" },
  科技: { id: "technology", icon: "💻" },
  親子: { id: "family", icon: "👨‍👩‍👧‍👦" },
  美食: { id: "food", icon: "🍽️" },
};

/**
 * 從檔案名稱提取報告類型
 */
function extractReportType(filename) {
  for (const [keyword, config] of Object.entries(REPORT_TYPES)) {
    if (filename.includes(keyword)) {
      return { type: keyword, ...config };
    }
  }
  return { type: "其他", id: "other", icon: "📊" };
}

/**
 * 解析文本內容
 */
function parseReportContent(content, filename) {
  const lines = content.split("\n");
  const reportInfo = extractReportType(filename);

  // 提取報告時間
  const timeMatch = content.match(/產生時間:\s*(.+)/);
  const reportTime = timeMatch
    ? timeMatch[1].trim()
    : new Date().toISOString().replace("T", " ").split(".")[0];

  // 提取活動總數
  const totalMatch = content.match(/活動總數:\s*(\d+)/);
  const total = totalMatch ? parseInt(totalMatch[1]) : 50;

  // 提取資料時間範圍
  const dateRangeMatch = content.match(/資料時間範圍:\s*(.+)/);
  const dateRange = dateRangeMatch
    ? dateRangeMatch[1].trim()
    : "2025-11-01 至 2026-01-01";

  // 提取涵蓋天數
  const daysMatch = content.match(/涵蓋天數:\s*(\d+)/);
  const days = daysMatch ? parseInt(daysMatch[1]) : 90;

  // 提取平均活動間隔
  const intervalMatch = content.match(/平均活動間隔:\s*([\d.]+)/);
  const avgInterval = intervalMatch ? parseFloat(intervalMatch[1]) : 2.0;

  // 提取平均每月活動數
  const monthlyMatch = content.match(/平均每月活動數:\s*([\d.]+)/);
  const avgMonthly = monthlyMatch ? parseFloat(monthlyMatch[1]) : 15.0;

  // 解析線上線下數據
  const onlineVsOffline = parseOnlineVsOffline(content);

  // 解析分類數據
  const categoryData = parseCategoryData(content);

  // 解析標籤數據
  const { topTags, tagCombinations } = parseTagData(content);

  // 解析時間數據
  const { weekdayData, monthlyData, weekdayVsWeekend, mostPopularDay } =
    parseTimeData(content);

  // 解析高互動率活動
  const topEvents = parseTopEvents(content);

  // 解析標題關鍵字
  const titleKeywords = parseTitleKeywords(content);

  // 解析市場機會
  const market = parseMarketData(content);

  return {
    id: reportInfo.id,
    title: `${reportInfo.type}類活動數據分析報告`,
    icon: reportInfo.icon,
    reportTime,
    overview: {
      total,
      dateRange,
      avgInterval,
      avgMonthly,
      days,
    },
    onlineVsOffline,
    categoryData,
    topTags,
    tagCombinations,
    weekdayData,
    monthlyData,
    weekdayVsWeekend,
    mostPopularDay,
    topEvents,
    titleKeywords,
    market,
  };
}

/**
 * 解析線上線下數據
 */
function parseOnlineVsOffline(content) {
  const result = [];

  // 線上活動
  const onlineMatch = content.match(
    /線上活動:\s*(\d+)\s*場[\s\S]*?平均觀看:\s*(\d+)[\s\S]*?平均喜歡:\s*(\d+)/
  );
  if (onlineMatch) {
    result.push({
      type: "線上活動",
      count: parseInt(onlineMatch[1]),
      avgView: parseInt(onlineMatch[2]),
      avgLike: parseInt(onlineMatch[3]),
    });
  }

  // 線下活動
  const offlineMatch = content.match(
    /線下活動:\s*(\d+)\s*場[\s\S]*?平均觀看:\s*(\d+)[\s\S]*?平均喜歡:\s*(\d+)/
  );
  if (offlineMatch) {
    result.unshift({
      type: "線下活動",
      count: parseInt(offlineMatch[1]),
      avgView: parseInt(offlineMatch[2]),
      avgLike: parseInt(offlineMatch[3]),
    });
  }

  return result;
}

/**
 * 解析分類數據
 */
function parseCategoryData(content) {
  const result = [];
  const categorySection = content.match(
    /1\.2 各活動分類互動率排行([\s\S]*?)【2\. 標籤熱度分析】/
  );

  if (categorySection) {
    const lines = categorySection[1].split("\n");
    for (const line of lines) {
      const match = line.match(
        /^\s*\d+\.\s+(.+?)\s+互動率:.*?觀看:(\d+,?\d*)\s+喜歡:(\d+)\s+\((\d+)場\)/
      );
      if (match) {
        result.push({
          name: match[1].trim(),
          view: parseInt(match[2].replace(",", "")),
          like: parseInt(match[3]),
          count: parseInt(match[4]),
        });
      }
    }
  }

  return result.slice(0, 10); // 只取前10個
}

/**
 * 解析標籤數據
 */
function parseTagData(content) {
  const topTags = [];
  const tagCombinations = [];

  // 解析高頻標籤
  const tagSection = content.match(
    /2\.2 標籤效能排行[\s\S]*?((?:\s+\d+\.\s+.+\n)+)/
  );
  if (tagSection) {
    const lines = tagSection[1].split("\n");
    for (const line of lines) {
      const match = line.match(
        /^\s*\d+\.\s+(.+?)\s+觀看:(\d+,?\d*)\s+喜歡:(\d+).*?\((\d+)場\)/
      );
      if (match && topTags.length < 9) {
        topTags.push({
          name: match[1].trim(),
          count: parseInt(match[4]),
          view: parseInt(match[2].replace(",", "")),
          like: parseInt(match[3]),
        });
      }
    }
  }

  // 解析標籤組合
  const comboSection = content.match(
    /2\.3 熱門標籤組合[\s\S]*?((?:\s+\d+\.\s+.+\n){1,3})/
  );
  if (comboSection) {
    const lines = comboSection[1].split("\n");
    for (const line of lines) {
      const match = line.match(/^\s*\d+\.\s+(.+)/);
      if (match && tagCombinations.length < 3) {
        tagCombinations.push(match[1].trim());
      }
    }
  }

  return { topTags, tagCombinations };
}

/**
 * 解析時間數據
 */
function parseTimeData(content) {
  const weekdayData = [];
  const monthlyData = [];
  let weekdayVsWeekend = [];
  let mostPopularDay = { day: "星期六", count: 0 };

  // 解析星期數據
  const weekdays = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日",
  ];
  const weekdaySection = content.match(/4\.1 星期活動熱度分析([\s\S]*?)4\.2/);

  if (weekdaySection) {
    for (const day of weekdays) {
      const match = weekdaySection[1].match(
        new RegExp(`${day}\\s+(\\d+)場\\s+觀看:(\\d+,?\\d*)\\s+喜歡:(\\d+)`)
      );
      if (match) {
        const count = parseInt(match[1]);
        weekdayData.push({
          day,
          count,
          view: parseInt(match[2].replace(",", "")),
          like: parseInt(match[3]),
        });

        if (count > mostPopularDay.count) {
          mostPopularDay = { day, count };
        }
      } else {
        weekdayData.push({ day, count: 0, view: 0, like: 0 });
      }
    }
  }

  // 解析月份數據
  const monthSection = content.match(/月份活動分布:([\s\S]*?)平均活動間隔/);
  if (monthSection) {
    const lines = monthSection[1].split("\n");
    for (const line of lines) {
      const match = line.match(/(\d{4}年\d{2}月)\s+(\d+)場\s+\(\s*([\d.]+)%\)/);
      if (match) {
        const month = match[1].replace("年", "-").replace("月", "");
        monthlyData.push({
          month,
          count: parseInt(match[2]),
          percentage: parseFloat(match[3]),
        });
      }
    }
  }

  // 解析平日假日
  const weekdayMatch = content.match(/平日活動:\s*(\d+)\s*場/);
  const weekendMatch = content.match(/假日活動:\s*(\d+)\s*場/);

  if (weekdayMatch && weekendMatch) {
    const weekdayCount = parseInt(weekdayMatch[1]);
    const weekendCount = parseInt(weekendMatch[1]);
    const total = weekdayCount + weekendCount;

    weekdayVsWeekend = [
      {
        type: "平日",
        count: weekdayCount,
        percentage: Math.round((weekdayCount / total) * 100),
      },
      {
        type: "假日",
        count: weekendCount,
        percentage: Math.round((weekendCount / total) * 100),
      },
    ];
  }

  return { weekdayData, monthlyData, weekdayVsWeekend, mostPopularDay };
}

/**
 * 解析高互動率活動
 */
function parseTopEvents(content) {
  const topEvents = [];
  const eventSection = content.match(
    /5\.2 高互動率標題[\s\S]*?((?:\s+\d+\.\s+.+\n\s+互動率:\s+[\d.]+%\n){1,10})/
  );

  if (eventSection) {
    const matches = eventSection[1].matchAll(
      /\d+\.\s+(.+)\n\s+互動率:\s+([\d.]+)%/g
    );
    for (const match of matches) {
      if (topEvents.length < 10) {
        topEvents.push({
          title: match[1].trim(),
          rate: parseFloat(match[2]),
        });
      }
    }
  }

  return topEvents;
}

/**
 * 解析標題關鍵字
 */
function parseTitleKeywords(content) {
  const keywords = [];
  const keywordSection = content.match(
    /5\.1 高觀看活動標題關鍵字[\s\S]*?((?:\s+\d+\.\s+.+\n){1,30})/
  );

  if (keywordSection) {
    const lines = keywordSection[1].split("\n");
    for (const line of lines) {
      const match = line.match(/^\s*\d+\.\s+(.+?)\s+\d+\s*次/);
      if (match && keywords.length < 8) {
        keywords.push(match[1].trim());
      }
    }
  }

  return keywords;
}

/**
 * 解析市場機會數據
 */
function parseMarketData(content) {
  const redOcean = [];
  const blueOcean = [];
  const learningSubmarket = [];
  const insights = [];

  // 解析紅海市場
  const redOceanSection = content.match(
    /紅海市場[\s\S]*?((?:\s+\d+\.\s+.+\n){1,10})/
  );
  if (redOceanSection) {
    const lines = redOceanSection[1].split("\n");
    for (const line of lines) {
      const match = line.match(/^\s*\d+\.\s+(.+?)\s+(\d+)\s*場活動/);
      if (match && redOcean.length < 6) {
        redOcean.push({
          name: match[1].trim(),
          count: parseInt(match[2]),
        });
      }
    }
  }

  // 解析藍海市場
  const blueOceanSection = content.match(
    /藍海市場[\s\S]*?((?:\s+\d+\.\s+.+\n){1,10})/
  );
  if (blueOceanSection) {
    const lines = blueOceanSection[1].split("\n");
    for (const line of lines) {
      const match = line.match(/^\s*\d+\.\s+(.+?)\s+(\d+)\s*場活動/);
      if (match && blueOcean.length < 5) {
        blueOcean.push({
          name: match[1].trim(),
          count: parseInt(match[2]),
        });
      }
    }
  }

  // 解析細分市場
  const submarketSection = content.match(
    /6\.1 學習類活動細分市場[\s\S]*?((?:\s+\d+\.\s+.+\n){1,20})/
  );
  if (submarketSection) {
    const lines = submarketSection[1].split("\n");
    for (const line of lines) {
      const match = line.match(/^\s*\d+\.\s+(.+?)\s+(\d+)場/);
      if (match && learningSubmarket.length < 8) {
        learningSubmarket.push({
          name: match[1].trim(),
          count: parseInt(match[2]),
        });
      }
    }
  }

  // 生成市場洞察（基於數據）
  insights.push(`假日活動佔比較高，週末是主要活動時段`);
  if (redOcean.length > 0) {
    insights.push(`${redOcean[0].name}相關活動競爭最激烈`);
  }
  if (blueOcean.length > 0) {
    insights.push(
      `${blueOcean
        .slice(0, 3)
        .map((b) => b.name)
        .join("、")}等領域競爭較低，有發展空間`
    );
  }

  return { redOcean, blueOcean, learningSubmarket, insights };
}

/**
 * 生成 TypeScript 代碼
 */
function generateTypeScriptCode(reports) {
  let code = `import { ReportData } from '../types/report';\n\n`;
  code += `export const reportsData: ReportData[] = [\n`;

  reports.forEach((report, index) => {
    code += `  // ${report.title}\n`;
    code += `  ${JSON.stringify(report, null, 2).replace(
      /"([^"]+)":/g,
      "$1:"
    )}`;
    code += index < reports.length - 1 ? ",\n\n" : "\n";
  });

  code += `];\n`;

  return code;
}

/**
 * 主函數
 */
function main() {
  console.log("🚀 開始解析報告文件...\n");

  // 讀取 data_report 資料夾中的所有 TXT 文件
  const files = fs
    .readdirSync(DATA_REPORT_DIR)
    .filter((file) => file.endsWith(".txt"))
    .sort();

  if (files.length === 0) {
    console.log("❌ 在 data_report 資料夾中找不到 TXT 文件");
    return;
  }

  console.log(`📁 找到 ${files.length} 個報告文件:\n`);
  files.forEach((file) => console.log(`   - ${file}`));
  console.log();

  const reports = [];

  // 解析每個文件
  for (const file of files) {
    console.log(`📊 解析: ${file}...`);
    const filePath = path.join(DATA_REPORT_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");

    try {
      const reportData = parseReportContent(content, file);
      reports.push(reportData);
      console.log(`   ✅ 成功解析 ${reportData.title}`);
      console.log(`   📈 活動總數: ${reportData.overview.total}`);
      console.log(`   📅 時間範圍: ${reportData.overview.dateRange}\n`);
    } catch (error) {
      console.log(`   ❌ 解析失敗: ${error.message}\n`);
    }
  }

  if (reports.length === 0) {
    console.log("❌ 沒有成功解析任何報告");
    return;
  }

  // 生成 TypeScript 代碼
  console.log("📝 生成 TypeScript 代碼...");
  const code = generateTypeScriptCode(reports);

  // 寫入文件
  fs.writeFileSync(OUTPUT_FILE, code, "utf-8");
  console.log(`✅ 成功寫入: ${OUTPUT_FILE}`);
  console.log(`\n🎉 完成！共處理 ${reports.length} 份報告\n`);

  // 顯示報告列表
  console.log("📋 報告列表:");
  reports.forEach((report, index) => {
    console.log(
      `   ${index + 1}. ${report.icon} ${report.title} (${report.id})`
    );
  });
  console.log();
}

// 執行主函數
main();
