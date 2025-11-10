"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ReportData } from "../types/report";

interface ReportViewerProps {
  reportData: ReportData;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ reportData }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#6366f1",
    "#14b8a6",
  ];

  const TabButton = ({ id, label }: { id: string; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 font-medium transition-all ${
        activeTab === id
          ? "bg-blue-600 text-white border-b-2 border-blue-600"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );

  const StatCard = ({
    title,
    value,
    subtitle,
  }: {
    title: string;
    value: string;
    subtitle?: string;
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {reportData.icon} Accupass {reportData.title}
          </h1>
          <p className="text-gray-600">
            報告時間：{reportData.reportTime} | 活動總數：
            {reportData.overview.total} 筆
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <TabButton id="overview" label="總覽" />
            <TabButton id="performance" label="活動效能" />
            <TabButton id="tags" label="標籤分析" />
            <TabButton id="time" label="時間趨勢" />
            <TabButton id="content" label="內容吸引力" />
            <TabButton id="market" label="市場機會" />
          </div>

          <div className="p-6">
            {/* 總覽 */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCard
                    title="活動總數"
                    value={reportData.overview.total.toString()}
                    subtitle="場活動"
                  />
                  <StatCard
                    title="資料範圍"
                    value={reportData.overview.days.toString()}
                    subtitle="天"
                  />
                  <StatCard
                    title="平均間隔"
                    value={reportData.overview.avgInterval.toString()}
                    subtitle="天/場"
                  />
                  <StatCard
                    title="月均活動"
                    value={reportData.overview.avgMonthly.toString()}
                    subtitle="場/月"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">
                      線上 vs 線下活動
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={reportData.onlineVsOffline}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#3b82f6" name="活動數" />
                        <Bar dataKey="avgView" fill="#8b5cf6" name="平均觀看" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">平日 vs 假日</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={reportData.weekdayVsWeekend as any}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(props: any) =>
                            `${props.name} ${props.percentage.toFixed(1)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {reportData.weekdayVsWeekend.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* 活動效能 */}
            {activeTab === "performance" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    各分類效能排行 (Top 10)
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={reportData.categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={100}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="view" fill="#3b82f6" name="平均觀看" />
                        <Bar dataKey="like" fill="#ec4899" name="平均喜歡" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">分類詳細數據</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 text-left">分類</th>
                          <th className="p-3 text-right">活動數</th>
                          <th className="p-3 text-right">平均觀看</th>
                          <th className="p-3 text-right">平均喜歡</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.categoryData.map((cat, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="p-3">{cat.name}</td>
                            <td className="p-3 text-right">{cat.count}</td>
                            <td className="p-3 text-right">
                              {cat.view.toLocaleString()}
                            </td>
                            <td className="p-3 text-right">{cat.like}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 標籤分析 */}
            {activeTab === "tags" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">高頻標籤 Top 9</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={reportData.topTags} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#3b82f6" name="出現次數" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">標籤效能數據</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 text-left">標籤</th>
                          <th className="p-3 text-right">使用次數</th>
                          <th className="p-3 text-right">平均觀看</th>
                          <th className="p-3 text-right">平均喜歡</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.topTags.map((tag, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{tag.name}</td>
                            <td className="p-3 text-right">{tag.count}</td>
                            <td className="p-3 text-right">
                              {tag.view.toLocaleString()}
                            </td>
                            <td className="p-3 text-right">{tag.like}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    熱門標籤組合
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {reportData.tagCombinations.map((combo, idx) => (
                      <li key={idx}>• {combo}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 時間趨勢 */}
            {activeTab === "time" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">星期活動分布</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={reportData.weekdayData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#3b82f6" name="活動數" />
                        <Bar dataKey="view" fill="#10b981" name="平均觀看" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">月份活動分布</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={reportData.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="活動數"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    title="平日活動"
                    value={reportData.weekdayVsWeekend[0].count.toString()}
                    subtitle={`場 (${reportData.weekdayVsWeekend[0].percentage}%)`}
                  />
                  <StatCard
                    title="假日活動"
                    value={reportData.weekdayVsWeekend[1].count.toString()}
                    subtitle={`場 (${reportData.weekdayVsWeekend[1].percentage}%)`}
                  />
                  <StatCard
                    title="最熱門"
                    value={reportData.mostPopularDay.day}
                    subtitle={`${reportData.mostPopularDay.count}場活動`}
                  />
                </div>
              </div>
            )}

            {/* 內容吸引力 */}
            {activeTab === "content" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    高互動率活動 Top 10
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={reportData.topEvents} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" unit="%" />
                        <YAxis dataKey="title" type="category" width={200} />
                        <Tooltip />
                        <Bar dataKey="rate" fill="#ec4899" name="互動率(%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">詳細排名</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 text-left">排名</th>
                          <th className="p-3 text-left">活動標題</th>
                          <th className="p-3 text-right">互動率</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.topEvents.map((event, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="p-2 font-bold text-gray-600 text-xs">
                              {idx + 1}
                            </td>
                            <td className="p-2 text-xs">{event.title}</td>
                            <td className="p-2 text-right font-semibold text-pink-600 text-xs">
                              {event.rate}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">
                    高觀看標題關鍵字
                  </h4>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {reportData.titleKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 市場機會 */}
            {activeTab === "market" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">
                      紅海市場 (競爭激烈)
                    </h3>
                    <ul className="space-y-2 text-sm text-red-800">
                      {reportData.market.redOcean.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{item.name}</span>
                          <span className="font-semibold">{item.count}場</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      藍海市場 (機會領域)
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      {reportData.market.blueOcean.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{item.name}</span>
                          <span className="font-semibold">
                            {item.count}場 (中低競爭)
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    學習類活動細分 (
                    {reportData.market.learningSubmarket.reduce(
                      (sum, item) => sum + item.count,
                      0
                    )}
                    場)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {reportData.market.learningSubmarket
                      .slice(0, 8)
                      .map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded p-3 text-center"
                        >
                          <div className="text-sm text-gray-600">
                            {item.name}
                          </div>
                          <div className="text-xl font-bold text-gray-800">
                            {item.count}場
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">
                    💡 市場洞察
                  </h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {reportData.market.insights.map((insight, idx) => (
                      <li key={idx}>• {insight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;
