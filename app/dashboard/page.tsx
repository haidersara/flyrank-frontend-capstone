"use client";

import { useState } from "react";

const navItems = ["Overview", "Analytics", "Users", "Reviews", "Settings", "Logs"];

const stats = [
  { label: "Total Settings Updates", value: "128", trend: "+12%", up: true },
  { label: "Active Users", value: "42", trend: "+4%", up: true },
  { label: "Pending Reviews", value: "7", trend: "-2%", up: false },
  { label: "Last Sync", value: "3 min ago", trend: "on time", up: true },
];

const filters = ["All", "System", "Billing", "Users"];

const activity = [
  { name: "Max R.", action: "Updated profile settings", time: "2 min ago", status: "Completed" },
  { name: "Sara H.", action: "Reviewed a pending case", time: "18 min ago", status: "Pending" },
  { name: "Jordan K.", action: "Synced project data", time: "1 hr ago", status: "Syncing" },
  { name: "Priya S.", action: "Updated billing email", time: "3 hrs ago", status: "Completed" },
  { name: "Sam T.", action: "Approved a milestone", time: "5 hrs ago", status: "Completed" },
];

const statusColors: Record<string, string> = {
  Completed: "bg-green-500/20 text-green-400",
  Pending: "bg-yellow-500/20 text-yellow-400",
  Syncing: "bg-blue-500/20 text-blue-400",
};

const sparkPoints = "0,20 10,15 20,18 30,10 40,12 50,6 60,8 70,3";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredActivity = activity.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-60 shrink-0 border-r border-zinc-800 bg-zinc-950 p-4">
        <a href="/" className="text-sm text-blue-400 hover:underline">
          Back to home
        </a>
        <nav className="mt-6 flex flex-col gap-1">
          {navItems.map((item, i) => (
            <button
              key={item}
              className={
                "rounded-lg px-3 py-2 text-left text-sm " +
                (i === 0
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white")
              }
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-zinc-400">Overview of recent activity and stats.</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-zinc-600"
            >
              <p className="text-sm text-zinc-400">{stat.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-2xl font-semibold">{stat.value}</p>
                <span
                  className={
                    "rounded-full px-2 py-0.5 text-xs " +
                    (stat.up ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")
                  }
                >
                  {stat.trend}
                </span>
              </div>
              <svg viewBox="0 0 70 24" className="mt-2 h-6 w-full">
                <polyline
                  points={sparkPoints}
                  fill="none"
                  stroke={stat.up ? "#4ade80" : "#f87171"}
                  strokeWidth="2"
                />
              </svg>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <h2 className="text-sm text-zinc-400">Activity Trend</h2>
          <svg viewBox="0 0 300 60" className="mt-2 h-16 w-full">
            <polyline
              points="0,50 40,30 80,35 120,15 160,25 200,10 240,20 280,5"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-zinc-500"
          />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={
                "rounded-full px-3 py-1 text-xs " +
                (activeFilter === f
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-400 hover:text-white")
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <div className="mt-4 divide-y divide-zinc-800 rounded-xl border border-zinc-800 bg-zinc-950">
            {filteredActivity.map((item) => (
              <div
                key={item.name + "-" + item.time}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold">
                    {initials(item.name)}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-zinc-400">{item.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={"rounded-full px-2 py-0.5 text-xs " + statusColors[item.status]}>
                    {item.status}
                  </span>
                  <span className="text-sm text-zinc-500">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
