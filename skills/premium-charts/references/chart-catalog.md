# Chart catalog

Each type: **when**, **premium details**, **pitfalls**, **library**.

## Contents
1. Trend: Line, Area, Stacked area, Sparkline, Step
2. Comparison: Bar, Grouped bar, Stacked bar, Horizontal bar, Lollipop, Bullet
3. Composition: Pie/Donut, Treemap, Sunburst, Waterfall, Stacked 100%
4. Distribution: Histogram, Boxplot, Violin
5. Relationship: Scatter, Bubble, Heatmap, Correlation matrix
6. Flow: Funnel, Sankey, Network graph
7. Progress/KPI: Gauge, Radial bar, KPI card, Progress ring
8. Time-specific: Candlestick, Calendar heatmap, Gantt/Timeline
9. Multi-dim: Radar, Parallel coordinates
10. Geo: Choropleth, Bubble map, Route/heat map
11. Combo: Bar + Line (dual axis)

---

## 1. Trend

### Line
- **When**: 3+ series trend, exact values matter.
- **Premium**: `type="monotone"`, strokeWidth 2–2.5, dot only on hover (activeDot r=4–5 + ring), label at the last point, comparison period dashed (`strokeDasharray="4 4"`) at 40% opacity.
- **Pitfall**: 6+ series → spaghetti. Use highlight-on-hover or small multiples. The Y axis need not start at 0, but make that explicit.
- **Library**: Recharts, ECharts, Chart.js, Victory Native.

### Area
- **When**: 1–2 series trend, a sense of volume matters (revenue, traffic).
- **Premium**: vertical gradient fill (stroke color 30–35% → 0%), thin stroke, subtle horizontal grid. The best choice for a dashboard hero chart.
- **Pitfall**: overlapping areas hide each other → use stacked or line.

### Stacked area
- **When**: total and composition over time.
- **Pitfall**: middle layers are hard to read — put the most important series at the bottom.

### Sparkline
- **When**: a mini trend inside a table/KPI card.
- **Premium**: no axis, grid, or tooltip; 24–40px height; color by trend direction (up green, down red) or neutral; dot at the last point.

### Step
- **When**: discrete change (price tiers, status, inventory).

## 2. Comparison

### Vertical bar
- **When**: ≤12 categories or time periods.
- **Premium**: `radius={[6,6,0,0]}`, barSize 24–40 or barCategoryGap 20–30%, non-hovered bars at 40% opacity, value label on top (when few bars).
- **Pitfall**: the Y axis ALWAYS starts at 0.

### Horizontal bar
- **When**: long labels, ranking, 8+ categories. Sorted by value.
- **Premium**: label on the left, value at the end of the bar, track (background) bar at 8% opacity.

### Grouped bar
- **Pitfall**: more than 3 groups → unreadable.

### Stacked bar
- **Premium**: radius only on the topmost segment, a 1–2px background-colored stroke between segments.

### Lollipop
- A minimalist alternative to bars, less visual noise with many categories.

### Bullet
- **When**: KPI vs target vs ranges (poor/ok/good). Saves space over a gauge.

## 3. Composition

### Pie / Donut
- **When**: ≤5 slices, totaling 100%.
- **Premium**: donut (innerRadius 60–70%), total + label in the center, `paddingAngle` 2, `cornerRadius` 4–6, slice grows on hover, legend alongside with percentages. Small slices merged into "Other" (<3%).
- **Pitfall**: 6+ slices, close values, 3D pie — never.

### Treemap
- **When**: share across many categories, hierarchy. Labels hidden on small rectangles.

### Sunburst
- **When**: 2–3 level hierarchy. ECharts/Nivo.

### Waterfall
- **When**: start → changes → end (P&L, budget).
- **Premium**: positive green, negative red, total neutral/brand; connector lines.
- **In Recharts**: stacked bar + a transparent "base" segment.

## 4. Distribution

### Histogram
- Bin count: Sturges/Freedman–Diaconis; no gap between bars (or 1px).

### Boxplot / Violin
- Outliers as separate dots. ECharts (boxplot), Visx/Nivo.

## 5. Relationship

### Scatter
- **Premium**: dot opacity 0.6–0.7 (overplotting), highlight on hover, optional trend line (linear regression), quadrant lines.
- **Pitfall**: 5K+ points → canvas/WebGL (ECharts `large: true`).

### Bubble
- Radius scaled by **area** (sqrt), not by radius.

### Heatmap
- **Premium**: sequential palette (one color, light → dark); diverging (negative↔positive) only when the center is meaningful; cell gap 2px, radius 3–4; visualMap/legend gradient; exact value in the tooltip.

### Correlation matrix
- Diverging palette, −1..1, diagonal hidden or neutral.

## 6. Flow

### Funnel
- **Premium**: per step show absolute + conversion % (from the previous step and from the start); a horizontal bar-funnel is often more precise than the classic trapezoid.

### Sankey
- **When**: flow from many sources → many targets (traffic source → page → conversion). ECharts/Nivo/D3.
- **Premium**: link color as a gradient from the source node, path highlight on hover.

### Network graph
- Force layout (ECharts graph, D3-force); canvas/WebGL at 500+ nodes.

## 7. Progress / KPI

### KPI card
- Big number (tabular-nums, 28–36px), label (muted, 13px), delta badge (▲ 12.4% vs last month, green/red), sparkline below. Loading → skeleton.

### Gauge / Radial bar
- **When**: a single value within a range (CPU, target completion).
- **Premium**: 270° arc, rounded cap, track at 10% opacity, value in the center, threshold colors.

### Progress ring
- Multiple concentric rings (Apple Activity style) — up to 3.

## 8. Time-specific

### Candlestick
- **Library**: TradingView Lightweight Charts (best), ECharts.
- **Premium**: volume in a bottom pane, crosshair, MA overlay, up green / down red (may be swapped by locale).

### Calendar heatmap
- GitHub contribution style. Nivo `ResponsiveCalendar`, ECharts calendar.

### Gantt / Timeline
- ECharts custom series, or frappe-gantt / vis-timeline. Today as a vertical line.

## 9. Multi-dimensional

### Radar
- ≤8 axes, ≤3 series, fill at 20% opacity. Axes must be on the same scale.

### Parallel coordinates
- ECharts. Filter with brush.

## 10. Geo

### Choropleth
- ECharts `map` + GeoJSON (e.g. the regions of Uzbekistan) or react-simple-maps. Sequential palette, legend, hover tooltip.
- **Pitfall**: use per-capita/normalized values, not absolute counts.

### Route / GPS heatmap
- A map library (MapLibre GL / Leaflet / react-native-maps) + a heatmap layer — this is a map library's job, not a chart library's.

## 11. Combo

### Bar + Line (dual axis)
- **When**: volume (bar) + rate (line), e.g. orders and conversion %.
- **Premium**: the right axis color matches the line color, both axis labels with clear units.
- **Pitfall**: dual axes can be manipulative — either start both axes at 0, or use small multiples.
