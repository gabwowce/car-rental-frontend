"use client";

import { useState } from "react";
import DataTable from "@/app/components/DataTable";
import {ActionButtons} from "@/app/components/ActionButtons";
import EntityModal from "@/app/components/modals/EntityModal";
import LoadingScreen from "@/app/components/loadingScreen";
import { useClientsData } from "@/hooks/useClientsData";
import CreateEntityButton from "@/app/components/CreateEntityButton";

type Klientas = NonNullable<
  ReturnType<typeof useClientsData>["clients"]
>[number];

/**
 * ClientsPage – administrative view for managing system clients.
 *
 * Features:
 * - Fetches client data from the backend
 * - Supports inline search filtering by name/email
 * - Allows creating, editing, and deleting clients via modals
 * - Uses generic UI components: DataTable, EntityModal, ActionButtons
 *
 * Editing/deleting is handled through modal windows and confirmation dialogs.
 * Deleting a client that is associated with other records will show an error.
 *
 * @returns {JSX.Element} Full client management page
 */
export default function ClientsPage() {
  /** --- Load client data and helpers --- */
  const {
    filtered,
    isLoading,
    search,
    setSearch,
    clientFields,
    saveClient,
    removeClient,
  } = useClientsData();

  /** --- Modal state --- */
  const [selected, setSelected] = useState<Klientas | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  /** --- Table columns configuration --- */
  const columns = [
    {
      label: "Name",
      accessor: (k: Klientas) => `${k.vardas} ${k.pavarde}`,
    },
    { label: "Email", accessor: "el_pastas" },
    { label: "Phone", accessor: "telefono_nr" },
    {
      label: "Registration Date",
      accessor: (k: Klientas) =>
        new Date(k.registracijos_data).toLocaleDateString("lt-LT"),
    },
    { label: "Bonus Points", accessor: "bonus_taskai" },
    {
      label: "Actions",
      accessor: (k: Klientas) => (
        <ActionButtons
          onEdit={() => {
            setSelected(k);
            setModalOpen(true);
          }}
          onDelete={async () => {
            const ok = window.confirm(
              `Are you sure you want to delete client ${k.vardas} ${k.pavarde}?`
            );
            if (!ok) return;

            try {
              await removeClient(k.kliento_id);
            } catch (e: any) {
              console.error("Failed to delete client:", e);
              alert(
                "This client cannot be deleted because they are associated with orders or other records."
              );
            }
          }}
        />
      ),
    },
  ];

  /** --- UI layout --- */
  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      {/* Header & Create Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <CreateEntityButton
          buttonLabel="+ New Client"
          modalTitle="New Client"
          fields={clientFields}
          onCreate={async (data) => {
            await saveClient(null, data); // null → create
          }}
        />
      </div>

      {/* Search bar */}
      <input
        className="border p-2 rounded mb-6 w-full max-w-md"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Client table */}
      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(k) => k.kliento_id}
      />

      {/* Edit modal */}
      {selected && (
        <EntityModal
          title={`Edit Client #${selected.kliento_id}`}
          entity={selected}
          fields={clientFields}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelected(null);
          }}
          onSave={async (upd) => {
            await saveClient(selected.kliento_id, upd);
            setModalOpen(false);
            setSelected(null);
          }}
          startInEdit={false}
        />
      )}
    </div>
  );
}
