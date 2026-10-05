# Chart catalog

Har bir tur: **qachon**, **premium tafsilotlar**, **pitfall'lar**, **library**.

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
- **Qachon**: 3+ series trend, aniq qiymat muhim.
- **Premium**: `type="monotone"`, strokeWidth 2–2.5, dot faqat hover'da (activeDot r=4–5 + ring), oxirgi nuqtada label, solishtirish davri dashed (`strokeDasharray="4 4"`) va 40% opacity.
- **Pitfall**: 6+ series → spaghetti. Highlight-on-hover yoki small multiples ishlat. Y o'qi 0'dan boshlanishi shart emas, lekin buni aniq ko'rsat.
- **Library**: Recharts, ECharts, Chart.js, Victory Native.

### Area
- **Qachon**: 1–2 series trend, hajm hissi muhim (revenue, traffic).
- **Premium**: vertical gradient fill (stroke rangi 30–35% → 0%), ingichka stroke, nozik horizontal grid. Dashboard hero chart uchun eng yaxshi tanlov.
- **Pitfall**: overlapping area'lar bir-birini yashiradi → stacked yoki line.

### Stacked area
- **Qachon**: jami va tarkib vaqt bo'yicha.
- **Pitfall**: o'rtadagi qatlamlarni o'qish qiyin — eng muhim series pastga.

### Sparkline
- **Qachon**: jadval/KPI card ichida mini trend.
- **Premium**: axis, grid, tooltip yo'q; 24–40px balandlik; rangi trend yo'nalishiga qarab (o'sish green, tushish red) yoki neytral; oxirgi nuqtada dot.

### Step
- **Qachon**: diskret o'zgarish (narx tarifi, status, inventory).

## 2. Comparison

### Vertical bar
- **Qachon**: ≤12 kategoriya yoki vaqt davri.
- **Premium**: `radius={[6,6,0,0]}`, barSize 24–40 yoki barCategoryGap 20–30%, hover'da boshqa bar'lar 40% opacity, value label tepada (kam bar bo'lsa).
- **Pitfall**: Y o'qi DOIM 0'dan boshlanadi.

### Horizontal bar
- **Qachon**: uzun label, ranking, 8+ kategoriya. Qiymat bo'yicha saralangan.
- **Premium**: label chapda, qiymat bar oxirida, track (fon) bar 8% opacity.

### Grouped bar
- **Pitfall**: 3 tadan ortiq group → o'qilmaydi.

### Stacked bar
- **Premium**: faqat eng yuqori segmentda radius, segmentlar orasida 1–2px background-rangli stroke.

### Lollipop
- Bar'ning minimalist alternativasi, ko'p kategoriyada vizual shovqin kam.

### Bullet
- **Qachon**: KPI vs target vs diapazonlar (poor/ok/good). Gauge'dan joy tejaydi.

## 3. Composition

### Pie / Donut
- **Qachon**: ≤5 bo'lak, jami 100%.
- **Premium**: donut (innerRadius 60–70%), markazda total + label, `paddingAngle` 2, `cornerRadius` 4–6, hover'da bo'lak kattalashadi, legend yonida foiz bilan. Kichik bo'laklar "Boshqa"ga birlashtiriladi (<3%).
- **Pitfall**: 6+ bo'lak, yaqin qiymatlar, 3D pie — hech qachon.

### Treemap
- **Qachon**: ko'p kategoriyali ulush, ierarxiya. Kichik to'rtburchaklarda label yashiriladi.

### Sunburst
- **Qachon**: 2–3 darajali ierarxiya. ECharts/Nivo.

### Waterfall
- **Qachon**: boshlang'ich → o'zgarishlar → yakuniy (P&L, budget).
- **Premium**: musbat green, manfiy red, total neytral/brand; connector chiziqlar.
- **Recharts'da**: stacked bar + transparent "base" segment.

## 4. Distribution

### Histogram
- Bin soni: Sturges/Freedman–Diaconis; bar'lar orasida bo'shliq yo'q (yoki 1px).

### Boxplot / Violin
- Outlier'lar alohida dot. ECharts (boxplot), Visx/Nivo.

## 5. Relationship

### Scatter
- **Premium**: dot opacity 0.6–0.7 (overplotting), hover'da highlight, ixtiyoriy trend line (linear regression), quadrant chiziqlari.
- **Pitfall**: 5K+ nuqta → canvas/WebGL (ECharts `large: true`).

### Bubble
- Radius **area** bo'yicha scale qilinadi (sqrt), radius bo'yicha emas.

### Heatmap
- **Premium**: sequential palette (bir rang, och → to'q), diverging (manfiy↔musbat) faqat markaz mazmunli bo'lsa; cell gap 2px, radius 3–4; visualMap/legend gradient; tooltip'da aniq qiymat.

### Correlation matrix
- Diverging palette, −1..1, diagonal yashirin yoki neytral.

## 6. Flow

### Funnel
- **Premium**: har bosqichda absolute + conversion % (oldingi bosqichdan va boshidan); horizontal bar-funnel ko'pincha klassik trapetsiyadan aniqroq.

### Sankey
- **Qachon**: ko'p manba → ko'p maqsad oqimi (traffic source → page → conversion). ECharts/Nivo/D3.
- **Premium**: link rangi source node'dan gradient, hover'da path highlight.

### Network graph
- Force layout (ECharts graph, D3-force), 500+ node'da canvas/WebGL.

## 7. Progress / KPI

### KPI card
- Katta raqam (tabular-nums, 28–36px), label (muted, 13px), delta badge (▲ 12.4% vs last month, green/red), sparkline pastda. Loading → skeleton.

### Gauge / Radial bar
- **Qachon**: bitta qiymat diapazonda (CPU, target bajarilishi).
- **Premium**: 270° arc, rounded cap, track 10% opacity, markazda qiymat, threshold ranglari.

### Progress ring
- Multiple concentric ring (Apple Activity style) — 3 tagacha.

## 8. Time-specific

### Candlestick
- **Library**: TradingView Lightweight Charts (eng yaxshi), ECharts.
- **Premium**: volume pastki pane, crosshair, MA overlay, up green / down red (yoki locale bo'yicha almashtirilishi mumkin).

### Calendar heatmap
- GitHub contribution style. Nivo `ResponsiveCalendar`, ECharts calendar.

### Gantt / Timeline
- ECharts custom series yoki frappe-gantt / vis-timeline. Bugungi kun vertical line.

## 9. Multi-dimensional

### Radar
- ≤8 o'q, ≤3 series, fill 20% opacity. O'qlar bir xil scale'da bo'lishi shart.

### Parallel coordinates
- ECharts. Brush bilan filter.

## 10. Geo

### Choropleth
- ECharts `map` + GeoJSON (masalan O'zbekiston viloyatlari) yoki react-simple-maps. Sequential palette, legend, hover tooltip.
- **Pitfall**: absolute son emas, per-capita/normalized qiymat ishlat.

### Route / GPS heatmap
- Map library (MapLibre GL / Leaflet / react-native-maps) + heatmap layer — bu chart library emas, map library vazifasi.

## 11. Combo

### Bar + Line (dual axis)
- **Qachon**: hajm (bar) + rate (line), masalan orders va conversion %.
- **Premium**: o'ng o'q rangi line rangiga mos, ikkala o'q label'i aniq birlik bilan.
- **Pitfall**: dual axis manipulyativ bo'lishi mumkin — ikkala o'q ham 0'dan, yoki small multiples.
