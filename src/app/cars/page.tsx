'use client'

import { useState } from 'react'
import { Automobiliai } from '@/fakeData'
import DataTable from '../components/DataTable'
import ActionButtons from '../components/ActionButtons'
import MapComponent from '../components/MapComponent'
import ViewModal from '../components/ViewModal'

type Automobilis = typeof Automobiliai[number]

export default function CarsPage() {
  const [statusFilter, setStatusFilter] = useState("visi")
  const [search, setSearch] = useState("")
  const [selectedCar, setSelectedCar] = useState<Automobilis | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)

  const filtered = Automobiliai.filter((a) => {
    const matchesStatus = statusFilter === "visi" || a.automobilio_statusas === statusFilter
    const matchesSearch = `${a.marke} ${a.modelis} ${a.numeris}`.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const columns = [
    {
      label: 'Modelis',
      accessor: (a: Automobilis) => `${a.marke} ${a.modelis}`,
    },
    { label: 'Numeris', accessor: 'numeris' },
    { label: 'Būsena', accessor: 'automobilio_statusas' },
    { label: 'Vietos', accessor: 'sedimos_vietos' },
    {
      label: 'Kaina parai',
      accessor: (a: Automobilis) => `${a.kaina_parai} €`,
    },
    {
      label: 'Veiksmai',
      accessor: (a: Automobilis) => (
        <ActionButtons
          onView={() => {
            setSelectedCar(a)
            setModalOpen(true)
          }}
          onEdit={() => console.log('Redaguoti', a.automobilio_id)}
          onDelete={() => console.log('Ištrinti', a.automobilio_id)}
        />
      ),
    },
  ]

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
      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(a) => a.automobilio_id}
        itemsPerPage={5}
      />

      {/* Žemėlapis */}
      <MapComponent />

      {/* Modalas */}
      {selectedCar && (
        <ViewModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title={`Automobilis: ${selectedCar.marke} ${selectedCar.modelis}`}
          content={
            <div className="space-y-2 text-sm">
              <p><strong>Numeris:</strong> {selectedCar.numeris}</p>
              <p><strong>Būsena:</strong> {selectedCar.automobilio_statusas}</p>
              <p><strong>Kaina:</strong> {selectedCar.kaina_parai} €</p>
              <p><strong>Sėdimos vietos:</strong> {selectedCar.sedimos_vietos}</p>
              {/* gali pridėti daugiau laukų */}
            </div>
          }
        />
      )}
    </div>
  )
}
