import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [userName, setUserName] = useState<string>("User");
  const [stats, setStats] = useState({
    allUsers: 0,
    activeUsers: 0,
    newThisMonth: 0,
  });
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const stored = localStorage.getItem("userName");
    if (stored) setUserName(stored);

    // placeholder stats; replace with API call if available
    setStats({ allUsers: 124, activeUsers: 98, newThisMonth: 7 });

    // auto-update system time every second (no manual refresh button)
    const t = setInterval(() => setNow(new Date()), 1_000);
    return () => clearInterval(t);
  }, []);

  const formatSmartDate = (d: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // For today show full weekday name (e.g. "Monday • 10:00")
    if (d.toDateString() === today.toDateString()) {
      return `${d.toLocaleDateString([], { weekday: "long" })} • ${time}`;
    }

    // For yesterday show "Yesterday • Mon, Jun 9"
    if (d.toDateString() === yesterday.toDateString()) {
      return `Yesterday • ${d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}`;
    }

    // Otherwise show short weekday + date
    return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  };

  const tzShort = (() => {
    try {
      const parts = new Intl.DateTimeFormat(undefined, { timeZoneName: "short" }).formatToParts(now);
      return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
    } catch {
      return "";
    }
  })();

  const Card = ({
    title,
    value,
    subtitle,
    emoji,
  }: {
    title: string;
    value: number | string;
    subtitle?: string;
    emoji?: string;
  }) => (
    <div className="rounded-2xl bg-white/40 p-5 flex items-center justify-between transition-colors duration-150 border-2 border-gray-300/90 hover:border-indigo-300 min-h-[96px]">
      <div>
        <div className="text-sm text-muted-foreground font-medium">{title}</div>
        <div className="mt-1 text-3xl font-extrabold text-foreground">{value}</div>
        {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
      </div>
      <div className="text-4xl ml-4">{emoji}</div>
    </div>
  );

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Welcome, {userName} 👋</h1>
          <p className="text-sm text-muted-foreground">Overview of your HRM dashboard</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-white/30 text-sm text-muted-foreground flex flex-col items-end border-2 border-gray-300/80">
            <span className="font-medium">{formatSmartDate(now)}</span>
            <span className="text-[11px] text-muted-foreground/70">
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
              {tzShort && <span className="ml-1">• {tzShort}</span>}
            </span>
          </div>
          {/* Refresh button removed — time updates automatically */}
        </div>
      </div>

      <div className="grid auto-rows-min gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card title="All Users" value={stats.allUsers} subtitle="Total users in system" emoji="👥" />
        <Card title="Active Users" value={stats.activeUsers} subtitle="Users active this week" emoji="🟢" />
        <Card title="New This Month" value={stats.newThisMonth} subtitle="Joined this month" emoji="✨" />
      </div>
    </div>
  );
}