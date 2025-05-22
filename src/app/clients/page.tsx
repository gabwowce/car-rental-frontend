'use client'

import { useClientsData } from '@/hooks/useClientsData'
import { useClientModals } from '@/hooks/useClientModals'
import DataTable from '@/app/components/DataTable'
import ActionButtons from '@/app/components/ActionButtons'
import ClientViewModal from '@/app/components/modals/ClientViewModal'
import ClientEditModal from '@/app/components/modals/ClientEditModal'
import ConfirmDeleteModal from '@/app/components/modals/ConfirmDeleteModal'

type Klientas = NonNullable<
  ReturnType<typeof useClientsData>['clients']
>[number]

export default function ClientsPage() {
  const { search, setSearch, filtered, isLoading } = useClientsData()
  const { selectedClient, mode, openView, openEdit, openDelete, close } = useClientModals()

  const columns = [
    {
      label: 'Vardas',
      accessor: (k: Klientas) => `${k.vardas} ${k.pavarde}`,
    },
    { label: 'El. paštas', accessor: 'el_pastas' },
    { label: 'Tel. nr.', accessor: 'telefono_nr' },
    {
      label: 'Registracijos data',
      accessor: (k: Klientas) =>
        new Date(k.registracijos_data).toLocaleDateString('lt-LT'),
    },
    { label: 'Bonus taškai', accessor: 'bonus_taskai' },
    {
      label: 'Veiksmai',
      accessor: (k: Klientas) => (
        <ActionButtons
          onView={() => openView(k)}
          onEdit={() => openEdit(k)}
          onDelete={() => openDelete(k)}
        />
      ),
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Klientai</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Naujas klientas
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Ieškoti pagal vardą, pavardę ar el. paštą"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full max-w-md"
        />
      </div>

      {isLoading ? (
        <p>Įkeliama...</p>
      ) : (
        <DataTable columns={columns} data={filtered} rowKey={(k) => k.kliento_id} />
      )}

      {selectedClient && mode === "view" && (
        <ClientViewModal client={selectedClient} isOpen={true} onClose={close} />
      )}
      {selectedClient && mode === "edit" && (
        <ClientEditModal client={selectedClient} isOpen={true} onClose={close} onSave={(updated) => {
          console.log("Išsaugotas klientas", updated)
        }} />
      )}
      {selectedClient && mode === "delete" && (
        <ConfirmDeleteModal
          isOpen={true}
          onClose={close}
          onConfirm={() => {
            console.log("Ištrintas:", selectedClient.kliento_id)
            close()
          }}
        />
      )}
    </div>
  )
}
