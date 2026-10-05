# Premium design standarti

"Premium" = kam shovqin, aniq ierarxiya, mukammal typography, nozik motion, har bir holat o'ylangan. Mo'ljal: Stripe, Linear, Vercel, Mercury dashboard'lari.

## 1. Chart card anatomiyasi
```
┌──────────────────────────────────────────────┐
│ Revenue                      [7D 30D 90D 1Y] │  ← title 14px/600 + controls
│ $48,294.12   ▲ 12.4% vs last period          │  ← asosiy raqam 28–32px tabular-nums + delta badge
│                                              │
│  ╱╲    ╱‾‾╲      ╱‾                          │  ← chart (gradient area)
│ ╱  ╲__╱    ╲____╱                            │
│ Jan   Feb   Mar   Apr   May                  │  ← axis 12px muted
│ ● Revenue  ○ Last period                     │  ← legend (agar 2+ series)
└──────────────────────────────────────────────┘
```
- Card: `rounded-xl border bg-card p-5 sm:p-6`, soya juda nozik yoki yo'q.
- Header va chart orasida 16–24px.
- Chart balandligi: dashboard card 240–320px, hero 360–420px, sparkline 32–48px.

## 2. Rang
- Ranglarni theme token'lardan ol: `var(--chart-1..5)`, `var(--muted-foreground)`, `var(--border)`.
- Default kategorik palette (light / dark ikkalasida ishlaydi):
  `#6366F1` indigo · `#22C55E` green · `#F59E0B` amber · `#EC4899` pink · `#06B6D4` cyan · `#8B5CF6` violet
- 1 series → brand rang. 2 series → brand + muted (yoki brand + 2-rang). Joriy davr to'liq, oldingi davr 35–40% opacity dashed.
- Semantik: o'sish `#16A34A`, tushish `#DC2626`, neytral `muted-foreground`. Xarajat kabi "kamaygani yaxshi" metrikada ranglar teskari.
- Sequential (heatmap): bir hue'ning 5–7 bosqichi. Diverging: ikki hue + neytral markaz.
- Rainbow palette, sof `#000`/`#fff` grid, to'yingan neon rang — ishlatma.
- Kontrast: chiziqlar fon bilan ≥3:1, matn ≥4.5:1.

## 3. Typography
- Font: loyiha fonti (Inter / Geist yaxshi). Raqamlar: `font-variant-numeric: tabular-nums`.
- Axis tick: 11–12px, `muted-foreground`, axis line va tick line yo'q.
- Tooltip label 12px muted, qiymat 13–14px 600.
- Katta raqamlar compact: `12.4K`, `$1.2M` (`Intl.NumberFormat(locale, { notation: 'compact' })`); tooltip'da to'liq qiymat.

## 4. Grid va o'qlar
- Faqat horizontal grid, `strokeDasharray="3 3"` yoki solid, `var(--border)` 50–60% opacity. Vertical grid yo'q.
- Y o'qi: 4–6 tick, chiroyli qadamlar (0, 25K, 50K...). Bar chartda 0'dan.
- X o'qi: `minTickGap` bilan ustma-ust tushishni oldini ol; sana formati qisqa (`Jan 12`, `12:00`).
- Kerak bo'lmasa Y o'qini butunlay yashir va qiymatni tooltip/label'ga qo'y (minimal uslub).

## 5. Tooltip (premium'ning eng ko'rinadigan qismi)
- Custom component: `rounded-lg border bg-popover/95 backdrop-blur px-3 py-2 shadow-lg`, min-width 160px.
- Tepada sana/kategoriya (muted 12px), har series: rangli 8px dot/chiziq + nom + o'ngda tekislangan qiymat (tabular-nums).
- Ixtiyoriy: oldingi davrga nisbatan delta, jami (stacked).
- Cursor: vertical line `var(--border)` yoki bar uchun muted fill 40%.
- Mobile'da: press-and-hold / tap bilan, ekran chetida flip.

## 6. Motion
- Kirish animatsiyasi 600–800ms `ease-out`, bir marta.
- Hover: 150–200ms transition (opacity, scale 1.02–1.05).
- Data o'zgarishi (filter): morph, qayta "o'sish" emas.
- `prefers-reduced-motion: reduce` → animatsiya o'chiriladi.
- Streaming'da animatsiya yo'q.

## 7. State'lar
- **Loading**: chart shaklidagi skeleton (bar'lar yoki to'lqin chiziq `animate-pulse`), header'dagi raqam ham skeleton. Spinner emas.
- **Empty**: chart maydoni markazida icon + "Bu davr uchun ma'lumot yo'q" + ixtiyoriy CTA (davrni o'zgartirish). Bo'sh o'qlar ko'rsatilmaydi.
- **Error**: qisqa xabar + "Qayta urinish" tugmasi (`refetch`). Texnik stack trace ko'rsatilmaydi.
- **Partial** (`null` qiymatlar): chiziqda uzilish (`connectNulls={false}`) va tooltip'da "—".
- **Stale/offline**: "Oxirgi yangilanish: 5 daqiqa oldin" kichik matn.

## 8. Accessibility
- Wrapper: `role="img"` + `aria-label="Revenue Jan–May: 32K dan 48K gacha o'sdi"` (avtomatik generatsiya qilingan xulosa).
- Ixtiyoriy: `<details>` ichida yoki sr-only jadval ko'rinishi.
- Rangdan tashqari farqlash: dashed/solid, marker shakli, direct label.
- Legend tugmalari `button` va `aria-pressed`.

## 9. Responsive
- `<640px`: legend chart ostiga, Y o'qi yashiriladi yoki compact, X tick'lar kamroq, time range control dropdown'ga.
- Touch target ≥40px.

## 10. Detallar (premium'ni oddiydan ajratadi)
- Oxirgi nuqtada pulsing dot (real-time) yoki qiymat label.
- Reference line: target/average, label bilan (`Target 50K`), dashed.
- Annotation: muhim voqea (release, kampaniya) vertical marker + tooltip.
- Bar chartda hover qilinmagan bar'lar dim bo'ladi.
- Donut markazida hover qilingan bo'lak qiymati almashadi.
- Legend bosilsa series toggle, kamida bitta series doim qoladi.
- Export tugmasi (PNG/CSV) card header'da `…` menu ichida.

## Anti-pattern'lar (hech qachon)
3D chart · 6+ bo'lakli pie · rainbow palette · default library tooltip · bold qora grid · har nuqtada dot · chart ichida ortiqcha label · keraksiz dual axis · Y o'qi 0'dan boshlanmagan bar chart · spinner loading · hardcode rang (dark mode buziladi).
