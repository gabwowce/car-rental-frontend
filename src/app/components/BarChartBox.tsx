/**
 * BarChartBox.tsx
 *
 * A reusable, styled component that renders a bar chart using Recharts.
 * Primarily used for displaying simple statistics (e.g., dashboard summaries).
 *
 * ---
 * ## Props:
 *
 * ### `title: string`
 * A short heading displayed above the chart.
 *
 * ### `data: { name: string; value: number }[]`
 * Array of data points to visualize. Each bar corresponds to one object,
 * where `name` is the category label and `value` is the bar height.
 *
 * ### `height?: number` (default: `200`)
 * Optional height of the chart in pixels.
 *
 * ### `barColor?: string` (default: Tailwind `#3b82f6`)
 * Custom bar color (hex or CSS color string).
 *
 * ---
 * ## Features:
 * - Fully responsive via `ResponsiveContainer`
 * - Clean Tailwind styling: white card background, padding, rounded corners, and shadow
 * - Gridlines and tooltips for enhanced readability
 * - Configurable colors and chart height
 *
 * ---
 * ## Example usage:
 *
 * ```tsx
 * <BarChartBox
 *   title="Orders by Status"
 *   data={[
 *     { name: "Pending", value: 8 },
 *     { name: "Confirmed", value: 14 },
 *     { name: "Canceled", value: 2 },
 *   ]}
 *   height={250}
 *   barColor="#16a34a" // Tailwind: bg-green-600
 * />
 * ```
 *
 * ---
 * ## Tech stack:
 * - Built with `Recharts` for chart rendering
 * - Styled using `Tailwind CSS`
 *
 * ---
 * ## Notes:
 * - Use inside dashboards or widgets for fast data visualization.
 * - If using server-rendered data, ensure `data` is ready before rendering this component.
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  name: string;
  value: number;
}[];

type BarChartBoxProps = {
  title: string;
  data: ChartData;
  height?: number;
  barColor?: string;
};

export default function BarChartBox({
  title,
  data,
  height = 200,
  barColor = "#3b82f6", // Tailwind: bg-blue-500
}: BarChartBoxProps) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
