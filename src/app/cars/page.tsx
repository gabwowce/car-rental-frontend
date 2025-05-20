'use client'

import { useState } from 'react'
import { Automobiliai } from '@/fakeData'
import DataTable from '../components/DataTable'
import ActionButtons from '../components/ActionButtons'
import MapComponent from '../components/MapComponent'

type Automobilis = typeof Automobiliai[number]
const columns: { label: string; accessor: keyof Automobilis | ((row: Automobilis) => React.ReactNode) }[] = [
  {
    label: 'Modelis',
    accessor: (a) => `${a.marke} ${a.modelis}`,
  },
  { label: 'Numeris', accessor: 'numeris' },
  { label: 'Būsena', accessor: 'automobilio_statusas' },
  { label: 'Vietos', accessor: 'sedimos_vietos' },
  {
    label: 'Kaina parai',
    accessor: (a) => `${a.kaina_parai} €`,
  },
  {
    label: 'Veiksmai',
    accessor: (a: Automobilis) => (
      <ActionButtons
        onView={() => console.log('Peržiūrėti', a.automobilio_id)}
        onEdit={() => console.log('Redaguoti', a.automobilio_id)}
        onDelete={() => console.log('Ištrinti', a.automobilio_id)}
      />
    ),
  },
]

export default function CarsPage() {
  const [statusFilter, setStatusFilter] = useState("visi")
  const [search, setSearch] = useState("")

  const filtered = Automobiliai.filter((a) => {
    const matchesStatus = statusFilter === "visi" || a.automobilio_statusas === statusFilter
    const matchesSearch = `${a.marke} ${a.modelis} ${a.numeris}`.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Automobiliai</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Pridėti naują automobilį
        </button>
      </div>

      {/* Filtrai */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ieškoti pagal modelį ar numerį"
          className="border p-2 rounded w-64"
        />
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="visi">Visi</option>
          <option value="laisvas">Laisvi</option>
          <option value="isnuomotas">Išnuomoti</option>
          <option value="servise">Servise</option>
        </select>
      </div>

      {/* Lentelė */}
      <DataTable columns={columns} data={filtered} rowKey={(a) => a.automobilio_id} itemsPerPage={5}/>

      <MapComponent />
    </div>
  )
}
