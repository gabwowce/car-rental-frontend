'use client'

import { useState } from 'react'
import { Saskaitos } from '@/fakeData'
import DataTable from '@/app/components/DataTable'
import ActionButtons from '@/app/components/ActionButtons'

type Saskaita = typeof Saskaitos[number]

const columns: {
  label: string
  accessor: keyof Saskaita | ((row: Saskaita) => React.ReactNode)
}[] = [
  { label: 'Sąskaitos nr.', accessor: 'saskaitos_nr' },
  { label: 'Klientas', accessor: 'klientas' },
  { label: 'Suma', accessor: (s) => `${s.suma} €` },
  {
    label: 'Data',
    accessor: (s) => new Date(s.saskaitos_data).toLocaleDateString('lt-LT'),
  },
  {
    label: 'Būsena',
    accessor: (s: Saskaita) => {
      const colorMap: Record<string, string> = {
        išrašyta: 'bg-gray-100 text-gray-800',
        apmokėta: 'bg-green-100 text-green-800',
        vėluojanti: 'bg-red-100 text-red-800',
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorMap[s.busena] || ''}`}>
          {s.busena}
        </span>
      )
    },
  },
  {
    label: 'Veiksmai',
    accessor: (s: Saskaita) => (
      <ActionButtons
        onView={() => console.log('Peržiūrėti', s.saskaitos_id)}
        onEdit={() => console.log('Atsisiųsti PDF', s.saskaitos_id)}
        show={{ delete: false }}
      />
    ),
  },
]

export default function InvoicesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('visi')

  const filtered = Saskaitos.filter((s) => {
    const matchSearch = `${s.klientas} ${s.saskaitos_nr}`.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'visi' || s.busena === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sąskaitos</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nauja sąskaita
        </button>
      </div>

      {/* Filtrai */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Ieškoti pagal klientą ar sąskaitos nr."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="visi">Visos</option>
          <option value="išrašyta">Išrašytos</option>
          <option value="apmokėta">Apmokėtos</option>
          <option value="vėluojanti">Vėluojančios</option>
        </select>
      </div>

      <DataTable columns={columns} data={filtered} rowKey={(s) => s.saskaitos_id} />
    </div>
  )
}
