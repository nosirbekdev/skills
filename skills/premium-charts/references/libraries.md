# Library selection

## Decision matrix
| Situation | Library |
|---|---|
| Project already has a chart library | **Use that one** (don't add a new dependency) |
| React/Next + shadcn/ui | **shadcn charts** (built on Recharts, theme tokens ready) |
| React/Next, standard charts (line/area/bar/pie/radar/scatter) | **Recharts** |
| Large data (5K+ points), heatmap, sankey, treemap, sunburst, gauge, boxplot, map, candlestick, 3D | **ECharts** (`echarts-for-react` or direct) |
| Nice defaults, calendar/sankey/chord/treemap, React | **Nivo** |
| Fully custom, unique visualization | **Visx** (React) or **D3** |
| Financial charts (candlestick, real-time price) | **TradingView Lightweight Charts** |
| Vue | ECharts (`vue-echarts`) or Chart.js (`vue-chartjs`) |
| Svelte | LayerChart or ECharts |
| Vanilla / simple site | Chart.js or ECharts |
| React Native / Expo | **Victory Native XL** (Skia, 60fps); for simple cases `react-native-gifted-charts` |
| Server-side image (PDF/email) | ECharts SSR (`renderToSVGString`) or Vega-Lite |

## Recharts
```bash
npm i recharts
```
- Next.js App Router: add `"use client"` to the component.
- Always `<ResponsiveContainer width="100%" height={...}>` — the parent must have a defined height.
- Custom tooltip: `<Tooltip content={<ChartTooltip />} cursor={{ stroke: 'var(--border)' }} />`.
- Gradient: `<defs><linearGradient id={useId()}>` — when there are multiple charts on one page, avoid id collisions with `useId()`.
- 1000+ points: `isAnimationActive={false}`, `dot={false}`.
- Ticks: `tickLine={false} axisLine={false} tickMargin={8} minTickGap={24}`.

## shadcn charts
```bash
npx shadcn@latest add chart
```
- `ChartContainer` + `ChartConfig` (label/color per series), `ChartTooltipContent`, `ChartLegendContent`.
- Colors: `--chart-1`…`--chart-5` CSS variables, `color: "var(--chart-1)"`.
- Dark mode automatic (via theme).

## ECharts
```bash
npm i echarts echarts-for-react
```
- Shrink the bundle: import only the charts/components you need from `echarts/core` via `use([...])`.
- Next.js: `dynamic(() => import('echarts-for-react'), { ssr: false })`.
- Theme: read colors from CSS variables inside the option (`getComputedStyle`); recompute the option when the theme changes.
- Large data: `sampling: 'lttb'`, `large: true`, `progressive`, `dataZoom` (inside + slider).
- Resize: `echarts-for-react` handles it automatically; manually, `ResizeObserver` + `chart.resize()`.
- Tooltip: HTML in `tooltip.formatter`, with `backgroundColor`/`borderColor`/`extraCssText` for a premium look.

## Nivo
```bash
npm i @nivo/core @nivo/line  # the package you need
```
- `Responsive*` components, typography/grid/tooltip via the `theme` prop.
- In SSR, `Responsive*` can't measure size → client-only.

## Visx / D3
- Only when you need a unique design. Visx: `@visx/scale`, `@visx/shape`, `@visx/axis`, `@visx/tooltip`, `@visx/responsive`.
- D3 with React: use D3 only for computation (scales, shape paths), render with React (JSX).

## TradingView Lightweight Charts
```bash
npm i lightweight-charts
```
- `createChart(container, options)` inside `useEffect`, `chart.remove()` in cleanup.
- Real-time: `series.update(bar)` (not setData).

## Chart.js
```bash
npm i chart.js react-chartjs-2
```
- Register only the controllers/scales you need with `Chart.register(...)`.
- For gradients use a scriptable `backgroundColor: (ctx) => ...`.

## React Native — Victory Native XL
```bash
npx expo install victory-native @shopify/react-native-skia react-native-reanimated react-native-gesture-handler
```
- `CartesianChart` + `Line`/`Area`/`Bar`, tooltip via `useChartPressState`, Skia `LinearGradient`.
- Font: `useFont(require('./Inter-Medium.ttf'), 12)` — required for axis labels.
- The Reanimated plugin must be in `babel.config.js`.
- Android/iOS: haptic feedback on press (`expo-haptics`) gives a premium feel.
- Offline: show data from cache (React Query persist / MMKV) and note the "last updated" time.

## Real-time (WebSocket)
- Buffer: keep the last N points (ring buffer); don't rebuild the whole array on every message — batch updates with throttle (250–1000ms).
- Recharts: `isAnimationActive={false}` while streaming.
- ECharts: `setOption({ series: [{ data }] }, { lazyUpdate: true })`.
- On disconnect: a status badge ("Live" / "Reconnecting…").
