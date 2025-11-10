"use client";

import React, { useState } from "react";
import ReportViewer from "../components/ReportViewer";
import { reportsData } from "../data/reportsData";

export default function ReportsPage() {
  const [selectedReportId, setSelectedReportId] = useState<string>(
    reportsData[0].id
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState("");

  const currentReport =
    reportsData.find((report) => report.id === selectedReportId) ||
    reportsData[0];

  const getButtonColor = (reportId: string) => {
    const colorMap: Record<string, string> = {
      learning: "blue",
      arts: "purple",
      experience: "green",
    };
    return colorMap[reportId] || "blue";
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshMessage("");

    try {
      const response = await fetch("/api/parse-reports", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        setRefreshMessage("✅ 報告已更新！頁面即將重新載入...");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setRefreshMessage("❌ 解析失敗：" + data.message);
        setIsRefreshing(false);
      }
    } catch (error) {
      setRefreshMessage("❌ 網路錯誤，請稍後再試");
      setIsRefreshing(false);
      console.error("刷新失敗:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Accupass 活動分析報告
              </h1>
              <span className="text-sm text-gray-500">
                共 {reportsData.length} 份報告
              </span>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                isRefreshing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-md"
              }`}
            >
              {isRefreshing ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  解析中...
                </>
              ) : (
                <>🔄 重新解析報告</>
              )}
            </button>
          </div>

          {refreshMessage && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                refreshMessage.includes("✅")
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {refreshMessage}
            </div>
          )}

          <div className="flex gap-4 overflow-x-auto pb-2">
            {reportsData.map((report) => {
              const color = getButtonColor(report.id);
              const isSelected = selectedReportId === report.id;

              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                    isSelected
                      ? `bg-${color}-600 text-white shadow-lg`
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor:
                            color === "blue"
                              ? "#2563eb"
                              : color === "purple"
                              ? "#9333ea"
                              : "#16a34a",
                        }
                      : undefined
                  }
                >
                  {report.icon} {report.title.replace("數據分析報告", "")}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <ReportViewer reportData={currentReport} />
      </div>
    </div>
  );
}
