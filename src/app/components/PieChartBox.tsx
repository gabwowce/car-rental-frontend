import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type ChartData = {
  /** Segment label */
  name: string;

  /** Segment value (used for proportional size) */
  value: number;
}[];

type PieChartBoxProps = {
  /** Title displayed above the chart */
  title: string;

  /** Data array for the pie chart */
  data: ChartData;

  /** Optional height of the chart container (default: 200px) */
  height?: number;

  /** Optional array of color strings for pie segments */
  colors?: string[];

  /** Radius of the pie chart (default: 70) */
  radius?: number;
};

/**
 * PieChartBox displays a pie chart inside a styled card.
 *
 * Uses Recharts for rendering and supports dynamic data, colors, and size.
 *
 * @param {PieChartBoxProps} props - Props to configure the chart display
 * @returns A pie chart wrapped in a card with a title
 *
 * @example
 * <PieChartBox
 *   title="Order Breakdown"
 *   data={[{ name: "Active", value: 10 }, { name: "Completed", value: 15 }]}
 * />
 */
export default function PieChartBox({
  title,
  data,
  height = 200,
  colors = ["#34d399", "#facc15", "#f87171"],
  radius = 70,
}: PieChartBoxProps) {
  return (
    <div className="bg-white p-6 rounded shadow">
      {/* Chart title */}
      <h2 className="text-sm font-semibold text-gray-700 mb-4">{title}</h2>

      {/* Responsive chart wrapper */}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={radius}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
