'use client'


import { Automobiliai2 as Automobiliai, Rezervacijos, Uzsakymai, Saskaitos, PagalbosUzklausos } from "@/fakeData"
import ActionButtons from "@/app/components/ActionButtons"
import DataTable from "@/app/components/DataTable"
import StatCard from "./components/StatCard"
import BarChartBox from "./components/BarChartBox"
import PieChartBox from "./components/PieChartBox"
import {
  FiCalendar,
  FiTruck,
  FiTool,
  FiCreditCard,
  FiAlertCircle,
  FiCornerDownLeft,
} from 'react-icons/fi'

const barData = [
  { name: 'Vykdomi', value: Uzsakymai.filter(u => u.busena === 'vykdomas').length },
  { name: 'Užbaigti', value: Uzsakymai.filter(u => u.busena === 'užbaigtas').length },
  { name: 'Atšaukti', value: Uzsakymai.filter(u => u.busena === 'atšauktas').length },
]

const pieData = [
  { name: 'Laisvi', value: Automobiliai.filter(a => a.automobilio_statusas === 'laisvas').length },
  { name: 'Servise', value: Automobiliai.filter(a => a.automobilio_statusas === 'servise').length },
  { name: 'Išnuomoti', value: Automobiliai.filter(a => a.automobilio_statusas === 'isnuomotas').length },
]


type Rezervacija = typeof Rezervacijos[number]

export type Column<T> = {
  label: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  className?: string
}



export default function DashboardPage() {
  const laisvi = Automobiliai.filter(a => a.automobilio_statusas === "laisvas").length
  const servise = Automobiliai.filter(a => a.automobilio_statusas === "servise").length

  const neapmoketosSaskaitos = Saskaitos.filter(s => s.busena === "vėluojanti").length
  const neatsakytosUzklausos = PagalbosUzklausos.filter(u => !u.atsakymas).length

  const today = new Date().toISOString().slice(0, 10)
  const siandienGrązinimai = Uzsakymai.filter(u => u.pabaiga === today).length

  const columns: Column<Rezervacija>[] = [
    { label: 'Automobilis', accessor: 'automobilis' },
    { label: 'Klientas', accessor: 'klientas' },
    { label: 'Pradžia', accessor: 'pradzia' },
    { label: 'Pabaiga', accessor: 'pabaiga' },
    {
      label: 'Veiksmai',
      accessor: (r: Rezervacija) => (
        <ActionButtons
          onView={() => console.log("Peržiūrėti rezervaciją", r.rezervacijos_id)}
          onEdit={() => console.log('Redaguoti rezervaciją', r.rezervacijos_id)}
          onDelete={() => console.log('Atšaukti rezervaciją', r.rezervacijos_id)}
          show={{ view: true, edit: true, delete: false }}
        />
      ),
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* 1-oji eilė: rezervacijos ir automobiliai */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <StatCard color="bg-blue-100" title="Rezervacijos šiandien" value="5" icon={<FiCalendar />} />
        <StatCard color="bg-teal-200" title="Laisvi automobiliai" value={laisvi} icon={<FiTruck />} />
        <StatCard color="bg-yellow-100" title="Servise esantys automobiliai" value={servise} icon={<FiTool />} />
        <StatCard color="bg-red-100" title="Neapmokėtos sąskaitos" value={neapmoketosSaskaitos} icon={<FiCreditCard />} />
        <StatCard color="bg-purple-100" title="Neatsakytos užklausos" value={neatsakytosUzklausos} icon={<FiAlertCircle />} />
        <StatCard color="bg-indigo-100" title="Grąžinimai šiandien" value={siandienGrązinimai} icon={<FiCornerDownLeft />} />
      </div>

     

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BarChartBox title="Užsakymai pagal būsenas" data={barData} />
        <PieChartBox title="Automobilių statusai" data={pieData} />
      </div>


      {/* Naujausios rezervacijos */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Naujausios rezervacijos</h2>
        <DataTable columns={columns} data={Rezervacijos.slice(0, 5)} rowKey={(r) => r.rezervacijos_id} />
      </div>
    </div>
  )
}
