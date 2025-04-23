'use client'

import { useState } from 'react'
import { Klientai } from '@/fakeData'
import DataTable from '@/app/components/DataTable'
import ActionButtons from '@/app/components/ActionButtons'

type Klientas = typeof Klientai[number]

const columns: {
  label: string
  accessor: keyof Klientas | ((row: Klientas) => React.ReactNode)
}[] = [
  {
    label: 'Vardas',
    accessor: (k) => `${k.vardas} ${k.pavarde}`,
  },
  { label: 'El. paštas', accessor: 'el_pastas' },
  { label: 'Tel. nr.', accessor: 'telefono_nr' },
  {
    label: 'Registracijos data',
    accessor: (k) =>
      new Date(k.registracijos_data).toLocaleDateString('lt-LT'),
  },
  { label: 'Bonus taškai', accessor: 'bonus_taskai' },
  {
    label: 'Veiksmai',
    accessor: (k: Klientas) => (
      <ActionButtons
        onView={() => console.log('Peržiūrėti', k.kliento_id)}
        onEdit={() => console.log('Redaguoti', k.kliento_id)}
        show={{ delete: false }}
      />
    ),
  },
]

export default function ClientsPage() {
  const [search, setSearch] = useState('')

  const filtered = Klientai.filter((k) =>
    `${k.vardas} ${k.pavarde} ${k.el_pastas}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Klientai</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Naujas klientas
        </button>
      </div>

      {/* Filtras */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Ieškoti pagal vardą, pavardę ar el. paštą"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full max-w-md"
        />
      </div>

      <DataTable columns={columns} data={filtered} rowKey={(k) => k.kliento_id} />
    </div>
  )
}
