---
name: premium-charts
description: Build any chart or data visualization at premium, production quality — line, area, bar, stacked, combo, pie, donut, radar, scatter, bubble, heatmap, treemap, sunburst, sankey, funnel, gauge, candlestick, waterfall, boxplot, calendar, gantt, network graph, map, sparkline, KPI cards and full dashboards. Works for React, Next.js, Vue, Svelte, vanilla JS and React Native/Expo with Recharts, shadcn charts, ECharts, Nivo, Visx, D3, Chart.js, ApexCharts, Lightweight Charts or Victory Native. Use this skill whenever the user mentions a chart, graph, plot, diagram of data, dashboard, analytics page, metrics, statistics, KPI, report visualization, or wants to "visualize" or "show" numbers — even if they do not say the word "chart". Always asks the developer a short set of clarifying questions before writing code.
---

# Premium Charts

Goal: build the chart the developer asked for at premium quality **on the first try** — at the level of Stripe, Linear, and Vercel dashboards. To do that, ask the right questions first, then write code against a clear plan.

The workflow has 4 phases: **Discovery → Plan → Build → QA**. Do not skip phases.

---

## Phase 1 — Discovery (BEFORE writing code)

### 1.1 Investigate first
Before asking questions, figure out everything you can answer yourself:
- `package.json` → framework (next, react, vue, svelte, expo), existing chart library, Tailwind, shadcn/ui, TypeScript.
- Existing chart components → match their style and patterns.
- `tailwind.config` / `globals.css` → brand colors, CSS variables, dark mode strategy.
- Data source: API types, Prisma/Drizzle schema, mock data, React Query hooks.
- Anything the developer already stated in their message.

Do not re-ask for things you already found.

### 1.2 Questions
Ask the remaining unknowns in **a single message**, numbered. Give each question options and a **default**, so the developer can proceed by just saying "default" or "you decide". Full question bank: `references/discovery.md`.

Core questions (ask only the ones you don't know the answer to, usually 3–6):

1. **Goal** — what question should the chart answer? (trend, comparison, share, distribution, correlation, flow, hierarchy, geography, progress)
2. **Chart type** — a specific type in mind, or should I recommend one based on the goal?
3. **Data** — shape (sample JSON or type), size (roughly how many points/series), source (API / static / real-time WebSocket).
4. **Platform and library** — framework and preferred library (or "recommend one").
5. **Interactivity** — tooltip, legend toggle, zoom/brush, drill-down, time range filter, export (PNG/CSV), real-time updates.
6. **Style** — brand colors, dark mode, placement (dashboard card / full page / sparkline), size.

If the developer doesn't know the type, recommend 1–2 options based on the goal and data and explain why in one sentence (`references/chart-catalog.md`).

### 1.3 When to proceed without questions
- If the developer says "don't ask", "you decide", or "fast" → build with defaults and list the assumptions you made in 2–4 lines at the start of your answer.
- If the request is fully clear (type, data, library stated) → go straight to Phase 2.

---

## Phase 2 — Plan

Before writing code, draft a short plan (show it to the developer in 3–6 lines):
- Chosen chart type + reason
- Library + reason (per the matrix in `references/libraries.md`)
- Data contract (TypeScript type)
- File list (component, types, hook, mock data)
- Interactive features

For simple requests, don't wait for separate approval — write the plan and build immediately.

---

## Phase 3 — Build

Before building, read:
- `references/premium-design.md` — **always** (the premium quality rules live here)
- `references/libraries.md` — the section for the chosen library
- `references/chart-catalog.md` — the section for the chosen chart type
- `examples/` — use the closest example as a starting point

### Mandatory requirements (every chart)
1. **Type-safe**: precise type/interface for the data, no `any`. For a generic component use `<T extends Record<string, unknown>>`.
2. **4 states**: loading (chart-shaped skeleton), error (message + retry), empty (clear text + icon), success.
3. **Responsive**: adapts to its container; labels/legend simplify on mobile.
4. **Dark mode**: colors via CSS variables/theme tokens, not hardcoded hex.
5. **Formatting**: `Intl.NumberFormat` / `Intl.DateTimeFormat` — currency, compact (12.4K), percent, dates. Locale as a parameter.
6. **Custom tooltip**: not the default tooltip — good typography, color indicator, formatted values, and a delta when relevant (▲ 12%).
7. **Accessibility**: `role="img"` + `aria-label` (chart summary), patterns/labels for color-blind users, keyboard focus (if the library supports it), `prefers-reduced-motion`.
8. **Performance**: memoize data with `useMemo`; disable animation at 1000+ points or pick a canvas library (ECharts); downsample at 10K+ (LTTB).
9. **Next.js**: add `"use client"` to the chart component; if SSR breaks, use `dynamic(() => import(...), { ssr: false })`.
10. **React Native**: Victory Native XL (Skia) or a similar native renderer; avoid WebView-based charts; tooltip via gesture (pan/press).

### Code structure
- Match existing project conventions (file placement, naming, import aliases).
- Small chart → a single component file. Dashboard → separate components under `components/charts/` plus shared `chart-card.tsx`, `chart-tooltip.tsx`, `formatters.ts`.
- If real-time: keep the WebSocket/React Query hook separate; the chart only takes props.
- If the developer provided no data → write a realistic mock data generator (`mock-data.ts`) with random noise, not a clean sine wave.

---

## Phase 4 — QA (before handing off)

Run through this checklist and fix any issues:
- [ ] Empty array, single point, `null`/`undefined` value, negative number, very large number, very long label — the chart doesn't break
- [ ] Colors have enough contrast in both light and dark
- [ ] Axis labels don't overlap (tick interval / rotate / truncate)
- [ ] Tooltip isn't clipped at screen edges
- [ ] Legend stays tidy even with 6+ series
- [ ] Readable at mobile width (360px)
- [ ] No TypeScript errors, no `any`
- [ ] Only necessary dependencies added; install command shown

Final answer to the developer: install command, files, how to use it (usage example), assumptions made. Keep it short.

---

## Reference files
| File | When to read |
|---|---|
| `references/discovery.md` | Phase 1 — question bank, defaults, recommendation rules |
| `references/chart-catalog.md` | Choosing a chart type, or best practices for a specific type |
| `references/libraries.md` | Library selection, install, platform-specific gotchas |
| `references/premium-design.md` | Always, before Build — premium visual standard |
| `examples/recharts-area-premium.tsx` | React/Next.js + Recharts/shadcn |
| `examples/echarts-heatmap-premium.tsx` | Complex/large data, ECharts |
| `examples/rn-victory-line-premium.tsx` | React Native / Expo |
