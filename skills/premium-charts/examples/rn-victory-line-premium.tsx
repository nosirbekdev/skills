/**
 * Premium line/area chart — React Native / Expo + Victory Native XL (Skia).
 * Install:
 *   npx expo install victory-native @shopify/react-native-skia react-native-reanimated react-native-gesture-handler expo-haptics
 * Font file (Inter-Medium.ttf) must exist in assets/fonts.
 */

import { useMemo } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, useColorScheme, View, type TextInputProps } from "react-native";
import { Area, CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import Animated, { useAnimatedProps, useDerivedValue } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export interface MetricPoint {
  t: number; // unix ms
  value: number;
}

interface Props {
  data: MetricPoint[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  title: string;
  locale?: string;
  unit?: string;
}

const AnimatedText = Animated.createAnimatedComponent(TextInput);

const palette = {
  light: { bg: "#ffffff", fg: "#0a0a0a", muted: "#71717a", border: "#e4e4e7", accent: "#6366f1" },
  dark: { bg: "#0a0a0a", fg: "#fafafa", muted: "#a1a1aa", border: "#27272a", accent: "#818cf8" },
} as const;

export function MetricLineChart({ data, isLoading, error, onRetry, title, locale = "en-US", unit = "" }: Props) {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const c = palette[scheme];
  const font = useFont(require("../assets/fonts/Inter-Medium.ttf"), 11);
  const { state, isActive } = useChartPressState({ x: 0, y: { value: 0 } });

  const chartData = useMemo(() => (data ?? []).map((d) => ({ t: d.t, value: d.value })), [data]);
  const last = chartData.at(-1)?.value;
  const first = chartData[0]?.value;
  const delta = first && last !== undefined ? (last - first) / first : null;

  const num = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }), [locale]);
  const timeFmt = useMemo(() => new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }), [locale]);

  // Live header value while scrubbing (runs on UI thread)
  const headerValue = useDerivedValue(() =>
    isActive ? `${state.y.value.value.value.toFixed(1)}${unit}` : last !== undefined ? `${last.toFixed(1)}${unit}` : "—",
  );
  // `text` is a native TextInput prop not present in TextInputProps typings — widen type explicitly
  const animatedProps = useAnimatedProps<TextInputProps & { text: string }>(() => ({ text: headerValue.value }));

  if (isLoading || !font) {
    return (
      <View style={[styles.card, { backgroundColor: c.bg, borderColor: c.border }]}>
        <ActivityIndicator color={c.muted} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={[styles.card, styles.center, { backgroundColor: c.bg, borderColor: c.border }]}>
        <Text style={{ color: c.muted }}>Ma'lumotni yuklab bo'lmadi</Text>
        {onRetry && (
          <Pressable onPress={onRetry} style={[styles.retry, { borderColor: c.border }]}>
            <Text style={{ color: c.fg, fontWeight: "600" }}>Qayta urinish</Text>
          </Pressable>
        )}
      </View>
    );
  }
  if (chartData.length < 2) {
    return (
      <View style={[styles.card, styles.center, { backgroundColor: c.bg, borderColor: c.border }]}>
        <Text style={{ color: c.muted }}>Ma'lumot yo'q</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.card, { backgroundColor: c.bg, borderColor: c.border }]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={`${title}: oxirgi qiymat ${num.format(last ?? 0)}${unit}`}
    >
      <Text style={[styles.title, { color: c.muted }]}>{title}</Text>
      <View style={styles.headerRow}>
        <AnimatedText editable={false} underlineColorAndroid="transparent" style={[styles.value, { color: c.fg }]} animatedProps={animatedProps} />
        {delta !== null && (
          <Text style={[styles.delta, { color: delta >= 0 ? "#16a34a" : "#dc2626" }]}>
            {delta >= 0 ? "▲" : "▼"} {num.format(Math.abs(delta) * 100)}%
          </Text>
        )}
      </View>

      <View style={{ height: 220 }}>
        <CartesianChart
          data={chartData}
          xKey="t"
          yKeys={["value"]}
          chartPressState={state}
          padding={{ left: 4, right: 4, bottom: 4 }}
          domainPadding={{ top: 16 }}
          axisOptions={{
            font,
            tickCount: { x: 4, y: 4 },
            labelColor: c.muted,
            lineColor: { grid: { x: "transparent", y: c.border }, frame: "transparent" },
            formatXLabel: (v) => timeFmt.format(new Date(v)),
            formatYLabel: (v) => num.format(v),
          }}
        >
          {({ points, chartBounds }) => (
            <>
              <Area points={points.value} y0={chartBounds.bottom} curveType="natural" animate={{ type: "timing", duration: 600 }}>
                <LinearGradient start={vec(0, chartBounds.top)} end={vec(0, chartBounds.bottom)} colors={[`${c.accent}55`, `${c.accent}00`]} />
              </Area>
              <Line points={points.value} color={c.accent} strokeWidth={2.25} curveType="natural" animate={{ type: "timing", duration: 600 }} />
              {isActive && <Circle cx={state.x.position} cy={state.y.value.position} r={6} color={c.accent} />}
              {isActive && <Circle cx={state.x.position} cy={state.y.value.position} r={10} color={`${c.accent}33`} />}
            </>
          )}
        </CartesianChart>
      </View>
    </View>
  );
}

// Haptic on scrub start (call from a gesture callback / useAnimatedReaction with runOnJS):
export const scrubHaptic = () => Haptics.selectionAsync();

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, padding: 16, minHeight: 300 },
  center: { alignItems: "center", justifyContent: "center", gap: 12 },
  title: { fontSize: 13, fontWeight: "500" },
  headerRow: { flexDirection: "row", alignItems: "baseline", gap: 8, marginTop: 4, marginBottom: 12 },
  value: { fontSize: 30, fontWeight: "700", fontVariant: ["tabular-nums"], padding: 0 },
  delta: { fontSize: 13, fontWeight: "600" },
  retry: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
});
