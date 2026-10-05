---
name: premium-charts
description: Build any chart or data visualization at premium, production quality — line, area, bar, stacked, combo, pie, donut, radar, scatter, bubble, heatmap, treemap, sunburst, sankey, funnel, gauge, candlestick, waterfall, boxplot, calendar, gantt, network graph, map, sparkline, KPI cards and full dashboards. Works for React, Next.js, Vue, Svelte, vanilla JS and React Native/Expo with Recharts, shadcn charts, ECharts, Nivo, Visx, D3, Chart.js, ApexCharts, Lightweight Charts or Victory Native. Use this skill whenever the user mentions a chart, graph, plot, diagram of data, dashboard, analytics page, metrics, statistics, KPI, report visualization, or wants to "visualize" or "show" numbers — even if they do not say the word "chart". Always asks the developer a short set of clarifying questions before writing code.
---

# Premium Charts

Maqsad: developer so'ragan chartni **birinchi urinishda** premium sifatda qurish — Stripe, Linear, Vercel dashboard'lari darajasida. Buning uchun avval to'g'ri savollar beriladi, keyin aniq reja asosida kod yoziladi.

Workflow 4 bosqich: **Discovery → Plan → Build → QA**. Bosqichlarni tashlab ketma.

---

## Phase 1 — Discovery (kod yozishdan OLDIN)

### 1.1 Avval o'zing o'rgan
Savol berishdan oldin javobini o'zing topa oladiganlarini aniqla:
- `package.json` → framework (next, react, vue, svelte, expo), mavjud chart library, Tailwind, shadcn/ui, TypeScript.
- Mavjud chart component'lar → ularning style'i va pattern'iga moslash kerak.
- `tailwind.config` / `globals.css` → brand ranglari, CSS variable'lar, dark mode strategiyasi.
- Data manbasi: API type'lar, Prisma/Drizzle schema, mock data, React Query hook'lar.
- Developer xabarida allaqachon aytilgan narsalar.

Topilgan javoblarni qayta so'rama.

### 1.2 Savollar
Qolgan noaniqliklarni **bitta xabarda**, raqamlangan holda so'ra. Har bir savolga variantlar va **default** ber, developer "default" yoki "o'zing hal qil" desa davom eta olishi uchun. To'liq savollar banki: `references/discovery.md`.

Asosiy savollar (faqat javobi noma'lumlarini so'ra, odatda 3–6 ta):

1. **Maqsad** — chart qanday savolga javob beradi? (trend, taqqoslash, ulush, taqsimot, korrelyatsiya, oqim, ierarxiya, geografiya, progress)
2. **Chart turi** — aniq turi bormi yoki maqsadga qarab men tavsiya qilaymi?
3. **Data** — shape (namuna JSON yoki type), hajmi (taxminan nechta nuqta/series), manba (API / static / real-time WebSocket).
4. **Platforma va library** — framework va afzal ko'rilgan library (yoki "tavsiya qil").
5. **Interaktivlik** — tooltip, legend toggle, zoom/brush, drill-down, time range filter, export (PNG/CSV), real-time update.
6. **Style** — brand ranglari, dark mode, joylashuv (dashboard card / full page / sparkline), o'lcham.

Agar developer turini bilmasa — maqsad va data'ga qarab 1–2 variant tavsiya qil va nima uchunligini bir jumlada tushuntir (`references/chart-catalog.md`).

### 1.3 Qachon savolsiz davom etish mumkin
- Developer "savol berma", "o'zing hal qil", "tez" desa → default'lar bilan qur va qabul qilgan taxminlaringni javob boshida 2–4 qatorda yoz.
- So'rov to'liq aniq bo'lsa (tur, data, library aytilgan) → to'g'ridan-to'g'ri Phase 2.

---

## Phase 2 — Plan

Kod yozishdan oldin qisqa reja tuz (developerga 3–6 qatorda ko'rsat):
- Tanlangan chart turi + sabab
- Library + sabab (`references/libraries.md` dagi matrix bo'yicha)
- Data contract (TypeScript type)
- Fayllar ro'yxati (component, types, hook, mock data)
- Interaktiv feature'lar

Murakkab bo'lmagan so'rovda rejani alohida tasdiqlatishni kutma — rejani yoz va darhol qur.

---

## Phase 3 — Build

Qurishdan oldin quyidagilarni o'qi:
- `references/premium-design.md` — **har doim** (premium sifat qoidalari shu yerda)
- `references/libraries.md` — tanlangan library bo'limi
- `references/chart-catalog.md` — tanlangan chart turi bo'limi
- `examples/` — eng yaqin namunani asos sifatida ol

### Majburiy talablar (har bir chart)
1. **Type-safe**: data uchun aniq type/interface, `any` yo'q. Generic component bo'lsa `<T extends Record<string, unknown>>`.
2. **4 ta state**: loading (chart shaklidagi skeleton), error (xabar + retry), empty (tushunarli matn + icon), success.
3. **Responsive**: container'ga moslashadi; mobile'da label/legend soddalashadi.
4. **Dark mode**: ranglar CSS variable/theme token orqali, hardcode hex emas.
5. **Formatlash**: `Intl.NumberFormat` / `Intl.DateTimeFormat` — currency, compact (12.4K), percent, sana. Locale parametr sifatida.
6. **Custom tooltip**: default tooltip emas — yaxshi typography, rang indikator, formatlangan qiymat, kerak bo'lsa delta (▲ 12%).
7. **Accessibility**: `role="img"` + `aria-label` (chart xulosasi), rang ko'r uchun pattern/label, keyboard focus (library qo'llasa), `prefers-reduced-motion`.
8. **Performance**: data `useMemo`, 1000+ nuqtada animation o'chiriladi yoki canvas library (ECharts) tanlanadi, 10K+ da downsampling (LTTB).
9. **Next.js**: chart component'ga `"use client"`; SSR muammosi bo'lsa `dynamic(() => import(...), { ssr: false })`.
10. **React Native**: Victory Native XL (Skia) yoki shu kabi native renderer; WebView-based chartlardan qoch, gesture (pan/press) bilan tooltip.

### Kod tuzilmasi
- Mavjud loyiha konventsiyalariga moslash (fayl joylashuvi, naming, import alias).
- Kichik chart → bitta component fayl. Dashboard → `components/charts/` ichida alohida component'lar + umumiy `chart-card.tsx`, `chart-tooltip.tsx`, `formatters.ts`.
- Real-time bo'lsa: WebSocket/React Query hook alohida, chart faqat props oladi.
- Developer data bermagan bo'lsa → realistik mock data generator (`mock-data.ts`) yoz, tasodifiy shovqin bilan, toza sinus emas.

---

## Phase 4 — QA (topshirishdan oldin)

Quyidagi checklist'dan o'tkaz va xatolarni tuzat:
- [ ] Bo'sh array, bitta nuqta, `null`/`undefined` qiymat, manfiy son, juda katta son, juda uzun label — chart buzilmaydi
- [ ] Ranglar light va dark'da kontrast yetarli
- [ ] Axis label'lar ustma-ust tushmaydi (tick interval / rotate / truncate)
- [ ] Tooltip ekran chetida kesilmaydi
- [ ] Legend 6+ series'da ham tartibli
- [ ] Mobile kenglikda (360px) o'qiladi
- [ ] TypeScript xatosiz, `any` yo'q
- [ ] Faqat kerakli dependency qo'shilgan; install buyrug'i ko'rsatilgan

Developerga yakuniy javob: o'rnatish buyrug'i, fayllar, qanday ishlatish (usage namunasi), qabul qilingan taxminlar. Qisqa.

---

## Reference fayllar
| Fayl | Qachon o'qiladi |
|---|---|
| `references/discovery.md` | Phase 1 — savollar banki, default'lar, tavsiya qoidalari |
| `references/chart-catalog.md` | Chart turi tanlash yoki aniq tur bo'yicha best practice |
| `references/libraries.md` | Library tanlash, install, platformaga xos gotcha'lar |
| `references/premium-design.md` | Har doim Build oldidan — premium vizual standart |
| `examples/recharts-area-premium.tsx` | React/Next.js + Recharts/shadcn |
| `examples/echarts-heatmap-premium.tsx` | Murakkab/katta data, ECharts |
| `examples/rn-victory-line-premium.tsx` | React Native / Expo |
