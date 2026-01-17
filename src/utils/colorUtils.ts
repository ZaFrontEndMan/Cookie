export const getCSSVariableColor = (variableName: string): string => {
  if (typeof window === "undefined") return "#000000";

  const root = document.documentElement;
  let value = getComputedStyle(root).getPropertyValue(variableName).trim();

  // If it's a raw HSL triplet like "200 70% 50%", wrap it
  if (/^\d+(\.\d+)?\s+\d+%?\s+\d+%?$/.test(value)) {
    value = `hsl(${value})`;
  }

  if (value.startsWith("hsl(")) {
    const hslMatch = value.match(/hsl\(([^)]+)\)/);
    if (hslMatch) {
      const [h, s, l] = hslMatch[1]
        .split(/\s+/)
        .map((v) => parseFloat(v.replace("%", "")));
      return hslToHex(h, s, l);
    }
  }

  return value || "#000000";
};

const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const getChartColors = () => ({
  primary: getCSSVariableColor("--primary"),
  secondary: getCSSVariableColor("--secondary"),
  chart1: getCSSVariableColor("--chart-1"),
  chart2: getCSSVariableColor("--chart-2"),
  chart3: getCSSVariableColor("--chart-3"),
  success: "#22c55e",
  danger: "#ef4444",
  warning: "#f59e0b",
});
