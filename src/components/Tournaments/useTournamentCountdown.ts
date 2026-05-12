"use client";

import { useEffect, useState } from "react";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

function getParts(target: number): CountdownParts {
  const totalMs = Math.max(0, target - Date.now());
  const s = Math.floor(totalMs / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    totalMs,
  };
}

export function useTournamentCountdown(isoEnd: string) {
  const end = Date.parse(isoEnd);
  const [parts, setParts] = useState<CountdownParts>(() =>
    Number.isFinite(end) ? getParts(end) : { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 }
  );

  useEffect(() => {
    if (!Number.isFinite(end)) return;
    const tick = () => setParts(getParts(end));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);

  return parts;
}
