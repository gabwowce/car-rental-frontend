import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type ChartData = {
  name: string
  value: number
}[]

type BarChartBoxProps = {
  title: string
  data: ChartData
  height?: number
  barColor?: string
}

export default function BarChartBox({
  title,
  data,
  height = 200,
  barColor = '#3b82f6', // Tailwind: bg-blue-500
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
  )
}
