# Library tanlash

## Qaror matrix'i
| Holat | Library |
|---|---|
| Loyihada chart library allaqachon bor | **O'shani ishlat** (yangi dependency qo'shma) |
| React/Next + shadcn/ui | **shadcn charts** (Recharts asosida, theme token'lar tayyor) |
| React/Next, standart chartlar (line/area/bar/pie/radar/scatter) | **Recharts** |
| Katta data (5K+ nuqta), heatmap, sankey, treemap, sunburst, gauge, boxplot, map, candlestick, 3D | **ECharts** (`echarts-for-react` yoki to'g'ridan-to'g'ri) |
| Chiroyli default'lar, calendar/sankey/chord/treemap, React | **Nivo** |
| To'liq custom, noyob vizualizatsiya | **Visx** (React) yoki **D3** |
| Moliyaviy chart (candlestick, real-time narx) | **TradingView Lightweight Charts** |
| Vue | ECharts (`vue-echarts`) yoki Chart.js (`vue-chartjs`) |
| Svelte | LayerChart yoki ECharts |
| Vanilla / oddiy sayt | Chart.js yoki ECharts |
| React Native / Expo | **Victory Native XL** (Skia, 60fps), oddiy holatda `react-native-gifted-charts` |
| Server-side image (PDF/email) | ECharts SSR (`renderToSVGString`) yoki Vega-Lite |

## Recharts
```bash
npm i recharts
```
- Next.js App Router: component'ga `"use client"`.
- Har doim `<ResponsiveContainer width="100%" height={...}>` — parent'ning balandligi aniq bo'lishi kerak.
- Custom tooltip: `<Tooltip content={<ChartTooltip />} cursor={{ stroke: 'var(--border)' }} />`.
- Gradient: `<defs><linearGradient id={useId()}>` — bir sahifada bir nechta chart bo'lsa id to'qnashuvini `useId()` bilan oldini ol.
- 1000+ nuqta: `isAnimationActive={false}`, `dot={false}`.
- Tick'lar: `tickLine={false} axisLine={false} tickMargin={8} minTickGap={24}`.

## shadcn charts
```bash
npx shadcn@latest add chart
```
- `ChartContainer` + `ChartConfig` (label/color har series uchun), `ChartTooltipContent`, `ChartLegendContent`.
- Ranglar: `--chart-1`…`--chart-5` CSS variable'lari, `color: "var(--chart-1)"`.
- Dark mode avtomatik (theme orqali).

## ECharts
```bash
npm i echarts echarts-for-react
```
- Bundle'ni kamaytirish: `echarts/core` dan faqat kerakli chart/component'larni `use([...])` bilan import qil.
- Next.js: `dynamic(() => import('echarts-for-react'), { ssr: false })`.
- Theme: option ichida ranglarni CSS variable'dan o'qib (`getComputedStyle`), theme o'zgarganda option'ni qayta hisobla.
- Katta data: `sampling: 'lttb'`, `large: true`, `progressive`, `dataZoom` (inside + slider).
- Resize: `echarts-for-react` avtomatik; manual'da `ResizeObserver` + `chart.resize()`.
- Tooltip: `tooltip.formatter` ichida HTML, `backgroundColor`/`borderColor`/`extraCssText` bilan premium ko'rinish.

## Nivo
```bash
npm i @nivo/core @nivo/line  # kerakli paket
```
- `Responsive*` component'lar, `theme` prop orqali typography/grid/tooltip.
- SSR'da `Responsive*` o'lcham olmaydi → client-only.

## Visx / D3
- Faqat noyob dizayn kerak bo'lsa. Visx: `@visx/scale`, `@visx/shape`, `@visx/axis`, `@visx/tooltip`, `@visx/responsive`.
- D3'ni React bilan: D3 faqat hisob-kitob (scale, shape path) uchun, render — React (JSX).

## TradingView Lightweight Charts
```bash
npm i lightweight-charts
```
- `createChart(container, options)` `useEffect` ichida, cleanup'da `chart.remove()`.
- Real-time: `series.update(bar)` (setData emas).

## Chart.js
```bash
npm i chart.js react-chartjs-2
```
- Faqat kerakli controller/scale'larni `Chart.register(...)`.
- Gradient uchun `scriptable` `backgroundColor: (ctx) => ...`.

## React Native — Victory Native XL
```bash
npx expo install victory-native @shopify/react-native-skia react-native-reanimated react-native-gesture-handler
```
- `CartesianChart` + `Line`/`Area`/`Bar`, `useChartPressState` bilan tooltip, Skia `LinearGradient`.
- Font: `useFont(require('./Inter-Medium.ttf'), 12)` — axis label uchun shart.
- Reanimated plugin `babel.config.js` da bo'lishi kerak.
- Android/iOS: haptic feedback press'da (`expo-haptics`) premium his beradi.
- Offline: data'ni cache'dan (React Query persist / MMKV) ko'rsat, "oxirgi yangilanish" vaqtini yoz.

## Real-time (WebSocket)
- Buffer: oxirgi N nuqtani saqla (ring buffer), har xabarda butun array'ni qayta yaratma — throttle (250–1000ms) bilan batch update.
- Recharts: `isAnimationActive={false}` streaming'da.
- ECharts: `setOption({ series: [{ data }] }, { lazyUpdate: true })`.
- Ulanish uzilsa: holat badge ("Live" / "Reconnecting…").
