# Discovery — question bank

Ask only the ones you can't answer from context. In a single message, numbered, each with options and a **(default)** marker. Max 6 questions — apply defaults for the rest.

## Question format (example)

```
A few questions to make the chart premium:

1. What should the chart show?
   a) trend over time (default)  b) compare categories  c) share  d) other: ...
2. What's the data like? Drop a sample JSON or type. Roughly how many points?
3. Library: the project has Recharts — use that? (default: yes)
4. Interactivity: a) tooltip + legend (default)  b) + zoom/brush  c) + time range filter  d) + real-time
5. Need dark mode? (default: yes, matching the project theme)

Say "default" and I'll build with these options.
```

## Full question bank

### Goal and context
- What question does the chart answer / what decision does it support?
- Who sees it? (CEO dashboard — simple, big numbers; analyst — details, zoom)
- Where does it live? dashboard card · full page · modal · sparkline (inside a table/KPI) · PDF/email export
- Multiple charts (dashboard) or a single one?

### Data
- Shape: sample JSON or TypeScript type
- Size: number of points, number of series (1 / 2–5 / 6+)
- Source: static · REST API (React Query) · WebSocket real-time · CSV file
- Is there a time axis? granularity (minute/hour/day/month), timezone
- Value unit: currency (which), percent, count, duration, bytes
- Any `null`/gaps? How should they be shown (break / 0 / interpolation)?

### Platform
- Framework: Next.js (App/Pages router) · React (Vite) · Vue · Svelte · React Native/Expo · vanilla
- Existing UI kit: shadcn/ui · MUI · Ant Design · Chakra · Tailwind-only
- Library preference or "recommend one"

### Interactivity
- Tooltip (always), legend toggle, hover highlight
- Zoom / pan / brush (large time series)
- Drill-down (click a bar for detail)
- Time range selector (7D / 30D / 90D / 1Y)
- Comparison (vs previous period, dashed line)
- Annotation / reference line (target, average, event)
- Export: PNG · SVG · CSV
- Real-time streaming (update frequency)

### Style
- Brand colors (hex or CSS variable)
- Dark mode: none · dark only · both (default)
- Visual style: minimal (Linear/Vercel, default) · rich/gradient (Stripe) · corporate · playful
- Animation: subtle (default) · none · expressive
- Language/locale: uz-UZ · ru-RU · en-US (for number and date formatting)

## Defaults (when a question is unanswered)
| Parameter | Default |
|---|---|
| Library (React/Next) | whatever exists in the project; if none, shadcn charts when shadcn/ui is present, otherwise Recharts |
| Library (large data / complex type) | ECharts |
| Library (React Native) | Victory Native XL |
| Style | minimal, gradient fill area, subtle grid |
| Dark mode | both, via theme tokens |
| Interactivity | custom tooltip + legend toggle |
| Locale | from the developer's language (uz → `uz-UZ`, otherwise `en-US`) |
| Animation | 600–800ms ease-out, respects `prefers-reduced-motion` |

## Recommending a chart type (when the developer doesn't know)
| Goal | First recommendation | Alternative |
|---|---|---|
| Trend over time | Area (1–2 series) / Line (3+) | Bar (few points) |
| Compare categories | Horizontal bar (long labels) / Vertical bar | Lollipop |
| Share (≤5 slices) | Donut + total in center | Stacked 100% bar |
| Share (6+ slices) | Treemap / horizontal bar | Sunburst |
| Distribution | Histogram | Boxplot, violin |
| Correlation | Scatter | Bubble (3rd dimension) |
| Plan vs actual | Bar + target line / Bullet | Gauge (single KPI) |
| Flow / conversion | Funnel | Sankey (many paths) |
| Composition of change | Waterfall | Stacked bar |
| Time × category intensity | Heatmap | Calendar heatmap |
| Financial price | Candlestick + volume | OHLC |
| Geography | Choropleth | Bubble map |
| Multi-dimensional profile | Radar (≤8 axes) | Parallel coordinates |
| Trend inside a table | Sparkline | Mini bar |
| A single key number | KPI card + sparkline + delta | Gauge |
