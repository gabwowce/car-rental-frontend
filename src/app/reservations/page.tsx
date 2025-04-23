'use client'

import { useState } from 'react'
import { Rezervacijos2 as Rezervacijos } from '@/fakeData'
import DataTable from '@/app/components/DataTable'
import ActionButtons from '@/app/components/ActionButtons'

type Rezervacija = typeof Rezervacijos[number]

const columns: {
  label: string
  accessor: keyof Rezervacija | ((row: Rezervacija) => React.ReactNode)
}[] = [
  { label: 'Klientas', accessor: 'klientas' },
  { label: 'Automobilis', accessor: 'automobilis' },
  { label: 'Pradžia', accessor: 'rezervacijos_pradzia' },
  { label: 'Pabaiga', accessor: 'rezervacijos_pabaiga' },
  {
    label: 'Būsena',
    accessor: (r: Rezervacija) => {
      const status = r.busena.toLowerCase()
      const colorMap: Record<string, string> = {
        aktyvi: 'bg-green-100 text-green-800',
        patvirtinta: 'bg-green-100 text-green-800',
        atšaukta: 'bg-red-100 text-red-800',
        laukia: 'bg-yellow-100 text-yellow-800',
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorMap[status] || ''}`}>
          {r.busena}
        </span>
      )
    },
  },
  {
    label: 'Veiksmai',
    accessor: (r: Rezervacija) => (
      <ActionButtons
        onView={() => console.log('Peržiūrėti', r.rezervacijos_id)}
        onEdit={() => console.log('Redaguoti', r.rezervacijos_id)}
        onDelete={() => console.log('Atšaukti', r.rezervacijos_id)}
        show={{ view: true, edit: false, delete: true }}
      />
    ),
  },
]

export default function ReservationsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('visi')

  const filtered = Rezervacijos.filter((r) => {
    const searchMatch = `${r.klientas} ${r.automobilis}`.toLowerCase().includes(search.toLowerCase())
    const statusMatch = statusFilter === 'visi' || r.busena === statusFilter
    return searchMatch && statusMatch
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rezervacijos</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nauja rezervacija
        </button>
      </div>

      {/* Filtrai */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ieškoti pagal klientą ar automobilį"
          className="border p-2 rounded w-64"
        />
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="visi">Visos</option>
          <option value="patvirtinta">Patvirtintos</option>
          <option value="laukiama">Laukiančios</option>
          <option value="atšaukta">Atšauktos</option>
        </select>
      </div>

      <DataTable columns={columns} data={filtered} rowKey={(r) => r.rezervacijos_id} />
    </div>
  )
}
