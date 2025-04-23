import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type ChartData = {
  name: string
  value: number
}[]

type PieChartBoxProps = {
  title: string
  data: ChartData
  height?: number
  colors?: string[]
  radius?: number
}

export default function PieChartBox({
  title,
  data,
  height = 200,
  colors = ['#34d399', '#facc15', '#f87171'],
  radius = 70,
}: PieChartBoxProps) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">{title}</h2>
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
  )
}
