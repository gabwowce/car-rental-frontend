'use client'

import { useState } from 'react'
import { Uzsakymai } from '@/fakeData'
import DataTable from '@/app/components/DataTable'
import ActionButtons from '@/app/components/ActionButtons'

type Uzsakymas = typeof Uzsakymai[number]

const columns: {
  label: string
  accessor: keyof Uzsakymas | ((row: Uzsakymas) => React.ReactNode)
}[] = [
  { label: 'Klientas', accessor: 'klientas' },
  { label: 'Automobilis', accessor: 'automobilis' },
  { label: 'Pradžia', accessor: 'pradzia' },
  { label: 'Pabaiga', accessor: 'pabaiga' },
  {
    label: 'Būsena',
    accessor: (r: Uzsakymas) => {
      const colorMap: Record<string, string> = {
        vykdomas: 'bg-blue-100 text-blue-800',
        užbaigtas: 'bg-green-100 text-green-800',
        atšauktas: 'bg-red-100 text-red-800',
      }

      const status = r.busena.toLowerCase()
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorMap[status] || ''}`}>
          {r.busena}
        </span>
      )
    },
  },
  {
    label: 'Veiksmai',
    accessor: (r: Uzsakymas) => (
      <ActionButtons
        onView={() => console.log('Peržiūrėti', r.uzsakymo_id)}
        onEdit={() => console.log('Redaguoti', r.uzsakymo_id)}
        onDelete={() => console.log('Ištrinti', r.uzsakymo_id)}
      />
    ),
  },
]

export default function OrdersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('visi')

  const filtered = Uzsakymai.filter((r) => {
    const searchMatch = `${r.klientas} ${r.automobilis}`.toLowerCase().includes(search.toLowerCase())
    const statusMatch = statusFilter === 'visi' || r.busena === statusFilter
    return searchMatch && statusMatch
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Užsakymai</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Naujas užsakymas
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
          <option value="visi">Visi</option>
          <option value="vykdomas">Vykdomi</option>
          <option value="užbaigtas">Užbaigti</option>
          <option value="atšauktas">Atšaukti</option>
        </select>
      </div>

      <DataTable columns={columns} data={filtered} rowKey={(r) => r.uzsakymo_id} />
    </div>
  )
}
