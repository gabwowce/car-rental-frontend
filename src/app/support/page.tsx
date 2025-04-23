'use client'

import { useState } from 'react'
import { PagalbosUzklausos } from '@/fakeData'
import DataTable from '@/app/components/DataTable'
import ActionButtons from '@/app/components/ActionButtons'

type Uzklausa = typeof PagalbosUzklausos[number]

const columns: {
  label: string
  accessor: keyof Uzklausa | ((row: Uzklausa) => React.ReactNode)
}[] = [
  { label: 'Klientas', accessor: 'klientas' },
  { label: 'Tema', accessor: 'tema' },
  {
    label: 'Pateikta',
    accessor: (u) => new Date(u.pateikimo_data).toLocaleString('lt-LT'),
  },
  {
    label: 'Atsakyta',
    accessor: (u) =>
      u.atsakymas
        ? new Date(u.atsakymo_data).toLocaleString('lt-LT')
        : '—',
  },
  {
    label: 'Veiksmai',
    accessor: (u: Uzklausa) => (
      <ActionButtons
        onView={() => console.log('Peržiūrėti', u.uzklausos_id)}
        onEdit={() => console.log('Atsakyti', u.uzklausos_id)}
        show={{ delete: false }}
      />
    ),
  },
]

export default function SupportPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('visi')

  const filtered = PagalbosUzklausos.filter((u) => {
    const matchSearch = `${u.klientas} ${u.tema}`.toLowerCase().includes(search.toLowerCase())
    const matchStatus =
      statusFilter === 'visi' ||
      (statusFilter === 'neatsakyta' && !u.atsakymas) ||
      (statusFilter === 'atsakyta' && !!u.atsakymas)
    return matchSearch && matchStatus
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pagalbos užklausos</h1>
      </div>

      {/* Filtrai */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Ieškoti pagal klientą ar temą"
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
          <option value="neatsakyta">Neatsakytos</option>
          <option value="atsakyta">Atsakytos</option>
        </select>
      </div>

      <DataTable columns={columns} data={filtered} rowKey={(u) => u.uzklausos_id} />
    </div>
  )
}
