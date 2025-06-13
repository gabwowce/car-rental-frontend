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
 */
export default function PieChartBox({
  title,
  data,
  height = 200,
  colors = ["#0F597B", "#4089AE", "#8BA5B2", "#BFDBFE"],
  radius = 70,
}: PieChartBoxProps) {
  return (
    <div className="bg-[#0E1525] p-6 rounded shadow text-[#F7F7F7] ">
      <h2 className="text-sm font-semibold text-[#F7F7F7]  mb-4">{title}</h2>
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
          <Tooltip
            wrapperStyle={{ backgroundColor: "#1E2B45", color: "white" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
