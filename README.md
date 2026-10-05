# premium-charts

[![skills.sh](https://skills.sh/b/nosirbekdev/skills)](https://skills.sh/nosirbekdev/skills)

An AI agent skill that builds **premium-quality** charts of any type. Before writing code, it asks the developer a few short questions (chart type, data, framework, library, style), then produces a production-ready, type-safe, accessible chart.

## Install

```bash
npx skills add nosirbekdev/skills
```

## What it can do

- 30+ chart types: line, area, bar, stacked, combo, pie/donut, radar, scatter, bubble, heatmap, treemap, sunburst, sankey, funnel, gauge, candlestick, waterfall, boxplot, calendar, gantt, network, choropleth map, sparkline, KPI card, and more.
- Web: React, Next.js, Vue, Svelte, vanilla JS
- Mobile: React Native / Expo
- Libraries: Recharts, shadcn/ui charts, ECharts, Nivo, Visx, D3, Chart.js, ApexCharts, TradingView Lightweight Charts, Victory Native XL
- Always included: loading / error / empty states, dark mode, responsive layout, a11y, formatted tooltips, smooth animations

## Usage

Just tell the agent:

> Build a sales chart for the dashboard

The agent asks a few questions first, then builds the chart.

## Structure

```
skills/premium-charts/
├── SKILL.md                    # Workflow (discovery → plan → build → QA)
├── references/
│   ├── discovery.md            # Question bank + defaults
│   ├── chart-catalog.md        # Each chart type: when to use it, pitfalls
│   ├── libraries.md            # Library selection matrix + setup
│   └── premium-design.md       # Design system: color, typography, tooltip, motion, a11y
└── examples/
    ├── recharts-area-premium.tsx
    ├── echarts-heatmap-premium.tsx
    └── rn-victory-line-premium.tsx
```

## License

MIT
