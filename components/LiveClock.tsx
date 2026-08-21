"use client";

import { useEffect, useState } from "react";

export default function LiveClock({
  timeZone = "Asia/Karachi",
  label = "PKT",
}: {
  timeZone?: string;
  label?: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span className="font-mono text-xs tabular-nums text-text/60">
      {time ?? "--:--:--"} {label}
    </span>
  );
}
