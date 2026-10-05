# premium-charts

AI agent skill: istalgan chart turini **premium darajada** yaratadi. Kod yozishdan oldin developerdan qisqa savollar so'raydi (chart turi, data, framework, library, style), keyin production-ready, type-safe, accessible chart quradi.

## Install

```bash
npx skills add nosirbekdev/skills
```

## Nima qila oladi

- 30+ chart turi: line, area, bar, stacked, combo, pie/donut, radar, scatter, bubble, heatmap, treemap, sunburst, sankey, funnel, gauge, candlestick, waterfall, boxplot, calendar, gantt, network, choropleth map, sparkline, KPI card...
- Web: React, Next.js, Vue, Svelte, vanilla JS
- Mobile: React Native / Expo
- Library: Recharts, shadcn/ui charts, ECharts, Nivo, Visx, D3, Chart.js, ApexCharts, TradingView Lightweight Charts, Victory Native XL
- Har doim: loading / error / empty state, dark mode, responsive, a11y, formatted tooltips, smooth animation

## Ishlatish

Agent'ga shunchaki yozing:

> Dashboard uchun sales chart qilib ber

Agent avval savol beradi, keyin chart quradi.

## Structure

```
premium-charts/
├── SKILL.md                    # Workflow (discovery → plan → build → QA)
├── references/
│   ├── discovery.md            # Savollar banki + default'lar
│   ├── chart-catalog.md        # Har bir chart turi: qachon ishlatiladi, pitfall'lar
│   ├── libraries.md            # Library tanlash matrix'i + setup
│   └── premium-design.md       # Design system: rang, typography, tooltip, motion, a11y
└── examples/
    ├── recharts-area-premium.tsx
    ├── echarts-heatmap-premium.tsx
    └── rn-victory-line-premium.tsx
```

## License

MIT
