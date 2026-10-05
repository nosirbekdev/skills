# Discovery — savollar banki

Faqat javobi kontekstdan topilmaganlarini so'ra. Bitta xabarda, raqamlangan, har biriga variantlar va **(default)** belgisi bilan. Maksimal 6 ta savol — qolganlariga default qo'llanadi.

## Savol berish formati (namuna)

```
Chartni premium qilish uchun bir nechta savol:

1. Chart nimani ko'rsatishi kerak?
   a) vaqt bo'yicha trend (default)  b) kategoriyalarni taqqoslash  c) ulush  d) boshqa: ...
2. Data qanday? Namuna JSON yoki type tashlang. Taxminan nechta nuqta?
3. Library: loyihada Recharts bor — shuni ishlataymi? (default: ha)
4. Interaktivlik: a) tooltip + legend (default)  b) + zoom/brush  c) + time range filter  d) + real-time
5. Dark mode kerakmi? (default: ha, loyiha theme'iga mos)

"default" deb yozsangiz shu variantlar bilan quraman.
```

## To'liq savollar banki

### Maqsad va kontekst
- Chart qanday savolga javob beradi / qanday qarorga yordam beradi?
- Kim ko'radi? (CEO dashboard — sodda, katta raqamlar; analitik — detallar, zoom)
- Qayerda joylashadi? dashboard card · full page · modal · sparkline (table/KPI ichida) · PDF/email export
- Bir nechta chart (dashboard) yoki bitta?

### Data
- Shape: namuna JSON yoki TypeScript type
- Hajm: nuqtalar soni, series soni (1 / 2–5 / 6+)
- Manba: static · REST API (React Query) · WebSocket real-time · CSV fayl
- Vaqt o'qi bormi? granularity (minute/hour/day/month), timezone
- Qiymat birligi: currency (qaysi), percent, count, duration, bytes
- `null`/bo'shliqlar bormi? Ular qanday ko'rsatilsin (uzilish / 0 / interpolatsiya)?

### Platforma
- Framework: Next.js (App/Pages router) · React (Vite) · Vue · Svelte · React Native/Expo · vanilla
- Mavjud UI kit: shadcn/ui · MUI · Ant Design · Chakra · Tailwind-only
- Library afzalligi yoki "tavsiya qil"

### Interaktivlik
- Tooltip (har doim), legend toggle, hover highlight
- Zoom / pan / brush (katta time series)
- Drill-down (bar bosilsa detal)
- Time range selector (7D / 30D / 90D / 1Y)
- Comparison (oldingi davr bilan, dashed line)
- Annotation / reference line (target, average, event)
- Export: PNG · SVG · CSV
- Real-time streaming (yangilanish chastotasi)

### Style
- Brand ranglari (hex yoki CSS variable)
- Dark mode: yo'q · faqat dark · ikkalasi (default)
- Vizual uslub: minimal (Linear/Vercel, default) · rich/gradient (Stripe) · corporate · playful
- Animatsiya: subtle (default) · yo'q · expressive
- Til/locale: uz-UZ · ru-RU · en-US (raqam va sana formati uchun)

## Default'lar (savolga javob bo'lmasa)
| Parametr | Default |
|---|---|
| Library (React/Next) | loyihadagi mavjud; yo'q bo'lsa shadcn/ui bo'lsa shadcn charts, aks holda Recharts |
| Library (katta data / murakkab tur) | ECharts |
| Library (React Native) | Victory Native XL |
| Style | minimal, gradient fill area, subtle grid |
| Dark mode | ikkalasi, theme token orqali |
| Interaktivlik | custom tooltip + legend toggle |
| Locale | developer tilidan (uz → `uz-UZ`, aks holda `en-US`) |
| Animatsiya | 600–800ms ease-out, `prefers-reduced-motion` hurmat qilinadi |

## Chart turini tavsiya qilish (developer bilmasa)
| Maqsad | Birinchi tavsiya | Muqobil |
|---|---|---|
| Vaqt bo'yicha trend | Area (1–2 series) / Line (3+) | Bar (kam nuqta) |
| Kategoriya taqqoslash | Horizontal bar (uzun label) / Vertical bar | Lollipop |
| Ulush (≤5 bo'lak) | Donut + markazda total | Stacked 100% bar |
| Ulush (6+ bo'lak) | Treemap / horizontal bar | Sunburst |
| Taqsimot | Histogram | Boxplot, violin |
| Korrelyatsiya | Scatter | Bubble (3-o'lcham) |
| Plan vs fakt | Bar + target line / Bullet | Gauge (bitta KPI) |
| Oqim / konversiya | Funnel | Sankey (ko'p yo'nalish) |
| O'zgarish tarkibi | Waterfall | Stacked bar |
| Vaqt × kategoriya intensivlik | Heatmap | Calendar heatmap |
| Moliyaviy narx | Candlestick + volume | OHLC |
| Geografiya | Choropleth | Bubble map |
| Ko'p o'lchamli profil | Radar (≤8 o'q) | Parallel coordinates |
| Jadval ichida trend | Sparkline | Mini bar |
| Bitta asosiy raqam | KPI card + sparkline + delta | Gauge |
