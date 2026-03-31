"use client";

import { useEffect, useState } from "react";

const SPARKLE_COUNT = 5;
const COLORS = ["#ffbb00", "#ffc933", "#e6a800", "#ffd966", "#f5b800"];

export function CursorEffect() {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setMounted(true);
    setIsTouch(typeof window !== "undefined" && "ontouchstart" in window);
  }, []);

  useEffect(() => {
    if (!mounted || isTouch) return;

    const handleMove = (e: MouseEvent) => {
      const offsets = [
        { x: 0, y: 0 },
        { x: 12, y: -8 },
        { x: -10, y: 6 },
        { x: 8, y: 10 },
        { x: -6, y: -12 },
      ];
      setPositions(
        offsets.map((o) => ({
          x: e.clientX + o.x,
          y: e.clientY + o.y,
        }))
      );
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mounted, isTouch]);

  if (!mounted || isTouch || positions.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute h-2 w-2 rounded-full opacity-90 transition-all duration-150"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
            background: COLORS[i % COLORS.length],
            boxShadow: `0 0 8px ${COLORS[i % COLORS.length]}`,
          }}
        />
      ))}
    </div>
  );
}
