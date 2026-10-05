"use client";

/**
 * Premium area chart — Recharts + Tailwind (shadcn theme tokens).
 * Features: gradient fill, previous-period comparison, custom tooltip,
 * time range switcher, loading / error / empty states, a11y summary,
 * reduced-motion support, locale-aware formatting.
 */

import { useId, useMemo, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ---------- Types ----------
export interface RevenuePoint {
  date: string; // ISO date
  value: number | null;
  previous?: number | null;
}

export type TimeRange = "7D" | "30D" | "90D" | "1Y";

interface RevenueChartProps {
  data: RevenuePoint[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  range: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  currency?: string;
  locale?: string;
  title?: string;
}

const RANGES: TimeRange[] = ["7D", "30D", "90D", "1Y"];

// ---------- Formatters ----------
function createFormatters(locale: string, currency: string) {
  const full = new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 2 });
  const compact = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const shortDate = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" });
  const longDate = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const percent = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1, signDisplay: "exceptZero" });
  return {
    full: (v: number) => full.format(v),
    compact: (v: number) => compact.format(v),
    shortDate: (iso: string) => shortDate.format(new Date(iso)),
    longDate: (iso: string) => longDate.format(new Date(iso)),
    percent: (v: number) => percent.format(v),
  };
}

type Formatters = ReturnType<typeof createFormatters>;

function usePrefersReducedMotion(): boolean {
  return useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
}

// ---------- Tooltip ----------
// Version-agnostic (Recharts 2.x & 3.x) tooltip props
interface TooltipPayloadItem {
  dataKey?: string | number | ((obj: unknown) => unknown);
  value?: number | string | null;
}
interface ChartTooltipProps {
  active?: boolean;
  payload?: readonly TooltipPayloadItem[];
  label?: string | number;
  fmt: Formatters;
}

function ChartTooltip({ active, payload, label, fmt }: ChartTooltipProps) {
  if (!active || !payload?.length || typeof label !== "string") return null;
  const current = payload.find((p) => p.dataKey === "value")?.value;
  const previous = payload.find((p) => p.dataKey === "previous")?.value;
  const delta =
    typeof current === "number" && typeof previous === "number" && previous !== 0
      ? (current - previous) / previous
      : null;

  return (
    <div className="min-w-[180px] rounded-lg border bg-popover/95 px-3 py-2 shadow-lg backdrop-blur">
      <p className="mb-1.5 text-xs text-muted-foreground">{fmt.longDate(label)}</p>
      <Row color="var(--chart-1)" label="Joriy" value={typeof current === "number" ? fmt.full(current) : "—"} />
      {previous !== undefined && (
        <Row
          color="var(--chart-1)"
          dashed
          label="Oldingi davr"
          value={typeof previous === "number" ? fmt.full(previous) : "—"}
        />
      )}
      {delta !== null && (
        <p className={`mt-1.5 text-xs font-medium ${delta >= 0 ? "text-emerald-600" : "text-red-600"}`}>
          {delta >= 0 ? "▲" : "▼"} {fmt.percent(delta)}
        </p>
      )}
    </div>
  );
}

function Row({ color, label, value, dashed }: { color: string; label: string; value: string; dashed?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">
        <span
          className="h-0.5 w-3 rounded-full"
          style={{ background: dashed ? "transparent" : color, borderTop: dashed ? `2px dashed ${color}` : undefined, opacity: dashed ? 0.5 : 1 }}
        />
        {label}
      </span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
}

// ---------- States ----------
function ChartSkeleton() {
  return (
    <div className="flex h-full items-end gap-1.5" aria-busy="true" aria-label="Yuklanmoqda">
      {Array.from({ length: 24 }, (_, i) => (
        <div
          key={i}
          className="flex-1 animate-pulse rounded-t bg-muted"
          style={{ height: `${30 + Math.abs(Math.sin(i / 3)) * 55}%` }}
        />
      ))}
    </div>
  );
}

function ChartMessage({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-muted-foreground/60" aria-hidden>
        <path d="M3 3v18h18M7 15l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-sm text-muted-foreground">{title}</p>
      {action}
    </div>
  );
}

// ---------- Main ----------
export function RevenueChart({
  data,
  isLoading = false,
  error = null,
  onRetry,
  range,
  onRangeChange,
  currency = "USD",
  locale = "en-US",
  title = "Revenue",
}: RevenueChartProps) {
  const gradientId = useId();
  const reducedMotion = usePrefersReducedMotion();
  const fmt = useMemo(() => createFormatters(locale, currency), [locale, currency]);

  const summary = useMemo(() => {
    const points = (data ?? []).filter((d): d is RevenuePoint & { value: number } => typeof d.value === "number");
    if (points.length === 0) return null;
    const total = points.reduce((s, d) => s + d.value, 0);
    const prevTotal = points.reduce((s, d) => s + (d.previous ?? 0), 0);
    const delta = prevTotal > 0 ? (total - prevTotal) / prevTotal : null;
    const first = points[0];
    const last = points[points.length - 1];
    return {
      total,
      delta,
      aria: `${title}: ${fmt.shortDate(first.date)} – ${fmt.shortDate(last.date)}, jami ${fmt.full(total)}${
        delta !== null ? `, oldingi davrga nisbatan ${fmt.percent(delta)}` : ""
      }`,
    };
  }, [data, fmt, title]);

  const hasPrevious = useMemo(() => (data ?? []).some((d) => d.previous != null), [data]);
  const isEmpty = !isLoading && !error && (!data || data.length === 0 || summary === null);
  const animate = !reducedMotion && (data?.length ?? 0) < 1000;

  return (
    <section className="rounded-xl border bg-card p-5 sm:p-6">
      <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {isLoading ? (
            <div className="mt-2 h-8 w-40 animate-pulse rounded bg-muted" />
          ) : summary ? (
            <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-semibold tracking-tight tabular-nums">{fmt.full(summary.total)}</span>
              {summary.delta !== null && (
                <span
                  className={`rounded-md px-1.5 py-0.5 text-xs font-medium ${
                    summary.delta >= 0 ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
                  }`}
                >
                  {summary.delta >= 0 ? "▲" : "▼"} {fmt.percent(summary.delta)} oldingi davrga nisbatan
                </span>
              )}
            </div>
          ) : null}
        </div>

        <div role="group" aria-label="Davr" className="inline-flex rounded-lg bg-muted p-0.5">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={r === range}
              onClick={() => onRangeChange(r)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                r === range ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      <div className="h-[280px] sm:h-[320px]" role="img" aria-label={summary?.aria ?? title}>
        {isLoading ? (
          <ChartSkeleton />
        ) : error ? (
          <ChartMessage
            title="Ma'lumotni yuklab bo'lmadi"
            action={
              onRetry && (
                <button type="button" onClick={onRetry} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted">
                  Qayta urinish
                </button>
              )
            }
          />
        ) : isEmpty ? (
          <ChartMessage title="Bu davr uchun ma'lumot yo'q" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.32} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} />
              <XAxis
                dataKey="date"
                tickFormatter={fmt.shortDate}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                minTickGap={32}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                tickFormatter={fmt.compact}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={56}
                tickCount={5}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                className="hidden sm:block"
              />
              <Tooltip
                content={<ChartTooltip fmt={fmt} />}
                cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              />
              {hasPrevious && (
                <Area
                  type="monotone"
                  dataKey="previous"
                  stroke="var(--chart-1)"
                  strokeOpacity={0.4}
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="none"
                  dot={false}
                  activeDot={false}
                  isAnimationActive={animate}
                />
              )}
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--chart-1)"
                strokeWidth={2.25}
                fill={`url(#${gradientId})`}
                connectNulls={false}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 3, stroke: "var(--background)", fill: "var(--chart-1)" }}
                isAnimationActive={animate}
                animationDuration={700}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}

// ---------- Usage ----------
// const [range, setRange] = useState<TimeRange>("30D");
// const { data, isLoading, error, refetch } = useQuery({
//   queryKey: ["revenue", range],
//   queryFn: () => api.getRevenue(range),
// });
// <RevenueChart data={data} isLoading={isLoading} error={error} onRetry={refetch}
//   range={range} onRangeChange={setRange} currency="UZS" locale="uz-UZ" />

// ---------- Realistic mock data (demo / storybook) ----------
export function generateRevenueMock(days: number, seed = 42): RevenuePoint[] {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const start = new Date();
  start.setDate(start.getDate() - days);
  let v = 32000;
  let p = 29000;
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const weekend = d.getDay() === 0 || d.getDay() === 6 ? 0.82 : 1;
    v = Math.max(5000, v * (1 + (rand() - 0.46) * 0.08));
    p = Math.max(5000, p * (1 + (rand() - 0.48) * 0.08));
    return { date: d.toISOString().slice(0, 10), value: Math.round(v * weekend), previous: Math.round(p * weekend) };
  });
}

