# Premium design standard

"Premium" = low noise, clear hierarchy, perfect typography, subtle motion, every state considered. Reference: Stripe, Linear, Vercel, Mercury dashboards.

## 1. Chart card anatomy
```
┌──────────────────────────────────────────────┐
│ Revenue                      [7D 30D 90D 1Y] │  ← title 14px/600 + controls
│ $48,294.12   ▲ 12.4% vs last period          │  ← key number 28–32px tabular-nums + delta badge
│                                              │
│  ╱╲    ╱‾‾╲      ╱‾                          │  ← chart (gradient area)
│ ╱  ╲__╱    ╲____╱                            │
│ Jan   Feb   Mar   Apr   May                  │  ← axis 12px muted
│ ● Revenue  ○ Last period                     │  ← legend (if 2+ series)
└──────────────────────────────────────────────┘
```
- Card: `rounded-xl border bg-card p-5 sm:p-6`, very subtle shadow or none.
- 16–24px between header and chart.
- Chart height: dashboard card 240–320px, hero 360–420px, sparkline 32–48px.

## 2. Color
- Pull colors from theme tokens: `var(--chart-1..5)`, `var(--muted-foreground)`, `var(--border)`.
- Default categorical palette (works in both light and dark):
  `#6366F1` indigo · `#22C55E` green · `#F59E0B` amber · `#EC4899` pink · `#06B6D4` cyan · `#8B5CF6` violet
- 1 series → brand color. 2 series → brand + muted (or brand + 2nd color). Current period solid, previous period 35–40% opacity dashed.
- Semantic: growth `#16A34A`, decline `#DC2626`, neutral `muted-foreground`. For "lower is better" metrics like cost, invert the colors.
- Sequential (heatmap): 5–7 steps of one hue. Diverging: two hues + neutral center.
- Rainbow palette, pure `#000`/`#fff` grid, saturated neon colors — don't use.
- Contrast: lines vs background ≥3:1, text ≥4.5:1.

## 3. Typography
- Font: the project font (Inter / Geist are good). Numbers: `font-variant-numeric: tabular-nums`.
- Axis tick: 11–12px, `muted-foreground`, no axis line or tick line.
- Tooltip label 12px muted, value 13–14px 600.
- Big numbers compact: `12.4K`, `$1.2M` (`Intl.NumberFormat(locale, { notation: 'compact' })`); full value in the tooltip.

## 4. Grid and axes
- Horizontal grid only, `strokeDasharray="3 3"` or solid, `var(--border)` at 50–60% opacity. No vertical grid.
- Y axis: 4–6 ticks, nice steps (0, 25K, 50K...). Bar charts start at 0.
- X axis: avoid overlap with `minTickGap`; short date format (`Jan 12`, `12:00`).
- When not needed, hide the Y axis entirely and put the value in the tooltip/label (minimal style).

## 5. Tooltip (the most visible part of "premium")
- Custom component: `rounded-lg border bg-popover/95 backdrop-blur px-3 py-2 shadow-lg`, min-width 160px.
- Date/category at the top (muted 12px), per series: colored 8px dot/line + name + right-aligned value (tabular-nums).
- Optional: delta vs previous period, total (stacked).
- Cursor: vertical line `var(--border)`, or muted fill 40% for bars.
- On mobile: press-and-hold / tap, flip at screen edges.

## 6. Motion
- Entry animation 600–800ms `ease-out`, once.
- Hover: 150–200ms transition (opacity, scale 1.02–1.05).
- Data change (filter): morph, not a fresh "grow in".
- `prefers-reduced-motion: reduce` → animation off.
- No animation while streaming.

## 7. States
- **Loading**: chart-shaped skeleton (bars or a wave line with `animate-pulse`); the header number is a skeleton too. Not a spinner.
- **Empty**: icon centered in the chart area + "No data for this period" + optional CTA (change the period). Don't show empty axes.
- **Error**: short message + a "Retry" button (`refetch`). Don't show a technical stack trace.
- **Partial** (`null` values): break the line (`connectNulls={false}`) and show "—" in the tooltip.
- **Stale/offline**: a small "Last updated: 5 minutes ago" line.

## 8. Accessibility
- Wrapper: `role="img"` + `aria-label="Revenue Jan–May: grew from 32K to 48K"` (an auto-generated summary).
- Optional: a table view inside `<details>` or sr-only.
- Differentiate beyond color: dashed/solid, marker shape, direct labels.
- Legend toggles are `button`s with `aria-pressed`.

## 9. Responsive
- `<640px`: legend below the chart, Y axis hidden or compact, fewer X ticks, time range control as a dropdown.
- Touch target ≥40px.

## 10. Details (what separates premium from ordinary)
- Pulsing dot at the last point (real-time) or a value label.
- Reference line: target/average, with a label (`Target 50K`), dashed.
- Annotation: a key event (release, campaign) as a vertical marker + tooltip.
- In a bar chart, non-hovered bars dim.
- In a donut, the center shows the value of the hovered slice.
- Clicking the legend toggles a series; at least one series always stays visible.
- Export button (PNG/CSV) in a `…` menu in the card header.

## Anti-patterns (never)
3D charts · pie with 6+ slices · rainbow palette · the library's default tooltip · bold black grid · a dot at every point · excessive labels inside the chart · unnecessary dual axis · a bar chart whose Y axis doesn't start at 0 · spinner loading · hardcoded colors (breaks dark mode).
