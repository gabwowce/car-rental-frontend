'use client'

import {
  useGetAllCarsApiV1CarsGetQuery,
  useGetAllOrdersApiV1OrdersGetQuery,
  useGetAllReservationsApiV1ReservationsGetQuery,
  useGetAllInvoicesApiV1InvoicesGetQuery,
  useGetAllSupportsApiV1SupportGetQuery,
  useGetAllClientsApiV1ClientsGetQuery
} from '../store/carRentalApi'

type ReservationOut = NonNullable<ReturnType<typeof useGetAllReservationsApiV1ReservationsGetQuery>['data']>[number]

import ActionButtons from '@/app/components/ActionButtons'
import DataTable from '@/app/components/DataTable'
import StatCard from './components/StatCard'
import BarChartBox from './components/BarChartBox'
import PieChartBox from './components/PieChartBox'
import {
  FiCalendar,
  FiTruck,
  FiTool,
  FiCreditCard,
  FiAlertCircle,
  FiCornerDownLeft,
} from 'react-icons/fi'
import React from 'react'

export type Column<T> = {
  label: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  className?: string
}

export default function DashboardPage() {
  const { data: automobiliai = [] } = useGetAllCarsApiV1CarsGetQuery()
  const { data: uzsakymai = [] } = useGetAllOrdersApiV1OrdersGetQuery()
  const { data: rezervacijos = [] } = useGetAllReservationsApiV1ReservationsGetQuery()
  
  const { data: klientai = [] } = useGetAllClientsApiV1ClientsGetQuery()


  const getAutomobilis = (id: number) => {
  const a = automobiliai.find(a => a.automobilio_id === id)
  return a ? `${a.marke} ${a.modelis}` : `#${id}`
}

const getKlientas = (id: number) => {
  const k = klientai.find(k => k.kliento_id === id)
  return k ? `${k.vardas} ${k.pavarde}` : `Klientas #${id}`
}

  const { data: saskaitos = [] } = useGetAllInvoicesApiV1InvoicesGetQuery()
  const { data: pagalbosUzklausos = [] } = useGetAllSupportsApiV1SupportGetQuery()

  const laisvi = automobiliai.filter(a => a.automobilio_statusas === 'laisvas').length
  const servise = automobiliai.filter(a => a.automobilio_statusas === 'servise').length
  const isnuomoti = automobiliai.filter(a => a.automobilio_statusas === 'isnuomotas').length

  const neapmoketosSaskaitos = saskaitos.filter(s => s.status === 'vėluojanti').length
  const neatsakytosUzklausos = pagalbosUzklausos.filter(u => !u.atsakymas).length

  const today = new Date().toISOString().slice(0, 10)
  const siandienGrązinimai = uzsakymai.filter(u => u.grazinimo_data === today).length

  const barData = [
    { name: 'Patvirtini', value: uzsakymai.filter(u => u.uzsakymo_busena === 'patvirtinta').length },
    { name: 'Vykdomi', value: uzsakymai.filter(u => u.uzsakymo_busena === 'vykdoma').length },
    { name: 'Laukiami', value: uzsakymai.filter(u => u.uzsakymo_busena === 'laukiama').length },
    { name: 'Užbaigti', value: uzsakymai.filter(u => u.uzsakymo_busena === 'užbaigta').length },
     { name: 'Atšaukti', value: uzsakymai.filter(u => u.uzsakymo_busena === 'atšaukta').length },
  ]

  const pieData = [
    { name: 'Laisvi', value: laisvi },
    { name: 'Servise', value: servise },
    { name: 'Išnuomoti', value: isnuomoti },
  ]

const columns: Column<ReservationOut>[] = [
  {
    label: 'Automobilis',
    accessor: (r) => getAutomobilis(r.automobilio_id),
  },
  {
    label: 'Klientas',
    accessor: (r) => getKlientas(r.kliento_id),
  },,
  {
    label: 'Pradžia',
    accessor: (r) => r.rezervacijos_pradzia,
  },
  {
    label: 'Pabaiga',
    accessor: (r) => r.rezervacijos_pabaiga,
  },
  {
    label: 'Veiksmai',
    accessor: (r) => (
      <ActionButtons
        onView={() => console.log('Peržiūrėti rezervaciją', r.rezervacijos_id)}
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

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Naujausios rezervacijos</h2>
        <DataTable<ReservationOut>
          columns={columns}
          data={rezervacijos}
          rowKey={(r) => r.rezervacijos_id}
        />
      </div>
    </div>
  )
}
