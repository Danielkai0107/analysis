"use client";

import React, { useState } from "react";
import ReportViewer from "../components/ReportViewer";
import { reportsData } from "../data/reportsData";

export default function ReportsPage() {
  const [selectedReportId, setSelectedReportId] = useState<string>(
    reportsData[0].id
  );

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Accupass 活動分析報告
            </h1>
            <span className="text-sm text-gray-500">
              共 {reportsData.length} 份報告
            </span>
          </div>

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
