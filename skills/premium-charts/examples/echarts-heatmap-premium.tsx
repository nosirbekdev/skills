"use client";

/**
 * Premium heatmap — ECharts (tree-shaken) + theme-aware colors.
 * Use case: activity by weekday × hour. Same pattern works for any ECharts type
 * (sankey, treemap, gauge, candlestick...) — only `option` changes.
 */

import { useEffect, useMemo, useState, type ReactNode } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { HeatmapChart } from "echarts/charts";
import { GridComponent, TooltipComponent, VisualMapComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { EChartsOption } from "echarts";

echarts.use([HeatmapChart, GridComponent, TooltipComponent, VisualMapComponent, CanvasRenderer]);

export interface HeatCell {
  day: number; // 0 = Monday
  hour: number; // 0..23
  value: number;
}

interface ActivityHeatmapProps {
  data: HeatCell[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  locale?: string;
  title?: string;
}

interface ThemeColors {
  fg: string;
  muted: string;
  border: string;
  popover: string;
  accent: string;
  empty: string;
}

/** Reads CSS variables and re-reads when the `dark` class / data-theme changes. */
function useThemeColors(): ThemeColors | null {
  const [colors, setColors] = useState<ThemeColors | null>(null);
  useEffect(() => {
    const read = () => {
      const css = getComputedStyle(document.documentElement);
      const v = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
      setColors({
        fg: v("--foreground", "#0a0a0a"),
        muted: v("--muted-foreground", "#71717a"),
        border: v("--border", "#e4e4e7"),
        popover: v("--popover", "#ffffff"),
        accent: v("--chart-1", "#6366f1"),
        empty: v("--muted", "#f4f4f5"),
      });
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "style"] });
    return () => observer.disconnect();
  }, []);
  return colors;
}

function getDayLabels(locale: string): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 2024-01-01 is a Monday
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2024, 0, 1 + i)));
}

export function ActivityHeatmap({
  data,
  isLoading = false,
  error = null,
  onRetry,
  locale = "en-US",
  title = "Faollik (hafta kuni × soat)",
}: ActivityHeatmapProps) {
  const colors = useThemeColors();
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const option = useMemo<EChartsOption | null>(() => {
    if (!colors || !data?.length) return null;
    const days = getDayLabels(locale);
    const hours = Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, "0")}:00`);
    const max = Math.max(...data.map((d) => d.value), 1);
    const num = new Intl.NumberFormat(locale);

    return {
      animation: !reducedMotion,
      animationDuration: 600,
      grid: { top: 8, right: 8, bottom: 48, left: 48, containLabel: false },
      tooltip: {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.popover,
        padding: [8, 12],
        textStyle: { color: colors.fg, fontSize: 13 },
        extraCssText: "border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.12);",
        formatter: (p) => {
          const item = Array.isArray(p) ? p[0] : p;
          const [h, d, v] = item.value as [number, number, number];
          return `<div style="font-size:12px;color:${colors.muted};margin-bottom:4px">${days[d]}, ${hours[h]}</div>
                  <div style="font-weight:600;font-variant-numeric:tabular-nums">${num.format(v)} ta</div>`;
        },
      },
      xAxis: {
        type: "category",
        data: hours,
        axisLine: { show: false },
        axisTick: { show: false },
        splitArea: { show: false },
        axisLabel: { color: colors.muted, fontSize: 11, interval: 2 },
      },
      yAxis: {
        type: "category",
        data: days,
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: colors.muted, fontSize: 11 },
      },
      visualMap: {
        min: 0,
        max,
        orient: "horizontal",
        left: "center",
        bottom: 0,
        itemHeight: 120,
        itemWidth: 10,
        calculable: false,
        textStyle: { color: colors.muted, fontSize: 11 },
        inRange: { color: [colors.empty, colors.accent] },
      },
      series: [
        {
          type: "heatmap",
          data: data.map((c) => [c.hour, c.day, c.value]),
          itemStyle: { borderRadius: 4, borderColor: "transparent", borderWidth: 2 },
          emphasis: { itemStyle: { borderColor: colors.fg, borderWidth: 1 } },
          progressive: 2000,
        },
      ],
    };
  }, [colors, data, locale, reducedMotion]);

  const aria = useMemo(() => {
    if (!data?.length) return title;
    const peak = data.reduce((a, b) => (b.value > a.value ? b : a));
    return `${title}. Eng yuqori faollik: ${getDayLabels(locale)[peak.day]} ${peak.hour}:00 (${peak.value}).`;
  }, [data, locale, title]);

  let body: ReactNode;
  if (isLoading || !colors) {
    body = (
      <div className="grid h-full gap-0.5" style={{ gridTemplateColumns: "repeat(24, 1fr)" }} aria-busy="true">
        {Array.from({ length: 168 }, (_, i) => (
          <div key={i} className="animate-pulse rounded-sm bg-muted" />
        ))}
      </div>
    );
  } else if (error) {
    body = (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <p className="text-sm text-muted-foreground">Ma'lumotni yuklab bo'lmadi</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted">
            Qayta urinish
          </button>
        )}
      </div>
    );
  } else if (!option) {
    body = <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Ma'lumot yo'q</div>;
  } else {
    body = (
      <ReactEChartsCore echarts={echarts} option={option} notMerge lazyUpdate style={{ height: "100%", width: "100%" }} />
    );
  }

  return (
    <section className="rounded-xl border bg-card p-5 sm:p-6">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      <div className="h-[300px]" role="img" aria-label={aria}>
        {body}
      </div>
    </section>
  );
}

// Next.js: agar SSR xatosi bo'lsa —
// const ActivityHeatmap = dynamic(() => import("./echarts-heatmap-premium").then(m => m.ActivityHeatmap), { ssr: false });
