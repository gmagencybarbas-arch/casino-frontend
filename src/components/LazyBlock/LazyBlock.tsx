"use client";

import { useEffect, useRef, useState } from "react";

interface LazyBlockProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyBlock({ children, fallback }: LazyBlockProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "100px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[200px]">
      {isVisible ? children : fallback ?? <div className="mb-10 h-[300px] animate-pulse rounded-xl bg-[var(--color-card)]" />}
    </div>
  );
}
