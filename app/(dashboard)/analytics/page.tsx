"use client";

import { useMemo, useEffect } from "react";
import { RootState } from "@/store";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { useAuth } from "@/lib/AuthContext";
import { fetchApplications } from "@/store/slices/boardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#ef4444",
];

export default function AnalyticsPage() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const applications = useAppSelector(
    (state: RootState) => state.board.applications,
  );

  useEffect(() => {
    if (user && applications.length === 0)
      dispatch(fetchApplications(user.uid));
  }, [user, dispatch]);

  const stageData = useMemo(() => {
    const stages = ["saved", "applied", "oa", "interview", "offer", "rejected"];
    return stages.map((stage) => ({
      stage,
      count: applications.filter((app) => app.stage === stage).length,
    }));
  }, [applications]);

  const pieData = useMemo(() => {
    const stages = ["saved", "applied", "oa", "interview", "offer", "rejected"];
    return stages.map((stage) => ({
      name: stage,
      value: applications.filter((app) => app.stage === stage).length,
    }));
  }, [applications]);

  const lineData = useMemo(() => {
    const grouped = applications.reduce(
      (acc, app) => {
        const date = app.createdAt?.slice(0, 10);
        if (!date) return acc;
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(grouped)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [applications]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-white/50 mt-2">
          Track your job application progress and metrics.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total", value: applications.length },
          {
            label: "Offers",
            value: applications.filter((a) => a.stage === "offer").length,
          },
          {
            label: "Interviews",
            value: applications.filter((a) => a.stage === "interview").length,
          },
          {
            label: "Rejected",
            value: applications.filter((a) => a.stage === "rejected").length,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#1C1C2E] border border-white/10 rounded-xl p-4"
          >
            <p className="text-white/50 text-sm">{stat.label}</p>
            <p className="text-white text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-[#1C1C2E] border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-semibold text-lg mb-4">
            Applications by Stage
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#ffffff10"
                />
                <XAxis
                  dataKey="stage"
                  tick={{ fill: "#ffffff60" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "#ffffff60" }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: "#ffffff08" }}
                  contentStyle={{
                    backgroundColor: "#1C1C2E",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#1C1C2E] border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-semibold text-lg mb-4">
            Distribution Overview
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1C1C2E",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart — Full Width */}
        <div className="bg-[#1C1C2E] border border-white/10 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-white font-semibold text-lg mb-4">
            Application Timeline
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#ffffff10"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#ffffff60" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "#ffffff60" }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1C1C2E",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#6366f1",
                    strokeWidth: 2,
                    stroke: "#1C1C2E",
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
