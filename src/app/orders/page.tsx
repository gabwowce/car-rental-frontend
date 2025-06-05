"use client";

import { useState } from "react";
import DataTable from "@/app/components/DataTable";
import ActionButtons from "@/app/components/ActionButtons";
import EntityModal from "@/app/components/modals/EntityModal";
import StatusBadge from "@/app/components/StatusBadge";
import LoadingScreen from "@/app/components/loadingScreen";
import { useOrdersData } from "@/hooks/useOrdersData";
import type { OrderOut } from "@/store/carRentalApi";
import CreateEntityButton from "@/app/components/CreateEntityButton";

export default function OrdersPage() {
  const [selected, setSelected] = useState<OrderOut | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    filtered,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    getClientName,
    getCarName,
    saveOrder,
    handleDelete,
    orderFields,
  } = useOrdersData();

  /* --- lentelė --- */
  const columns = [
    {
      label: "Klientas",
      accessor: (o: OrderOut) => getClientName(o.kliento_id),
    },
    {
      label: "Automobilis",
      accessor: (o: OrderOut) => getCarName(o.automobilio_id),
    },
    { label: "Pradžia", accessor: "nuomos_data" },
    { label: "Pabaiga", accessor: "grazinimo_data" },
    {
      label: "Būsena",
      accessor: (o: OrderOut) => (
        <StatusBadge status={o.uzsakymo_busena || ""} />
      ),
    },
    {
      label: "Veiksmai",
      accessor: (o: OrderOut) => (
        <ActionButtons
          onEdit={() => {
            setSelected(o);
            setModalOpen(true);
          }}
          onDelete={() => handleDelete(o.uzsakymo_id)}
        />
      ),
    },
  ];

  /* --- modal SAVE --- */
  const onSave = async (updated: OrderOut) => {
    await saveOrder(selected!.uzsakymo_id, {
      nuomos_data: updated.nuomos_data,
      grazinimo_data: updated.grazinimo_data,
      uzsakymo_busena: updated.uzsakymo_busena,
    });
    setModalOpen(false);
    setSelected(null);
  };

  /* --- UI --- */
  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Užsakymai</h1>
        <CreateEntityButton
          buttonLabel="+ Naujas užsakymas"
          modalTitle="Naujas užsakymas"
          fields={orderFields}
          onCreate={async (data) => {
            await saveOrder(null, data);
          }}
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          className="border p-2 rounded w-64"
          placeholder="Ieškoti pagal klientą ar automobilį"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(r) => r.uzsakymo_id}
      />

      {selected && (
        <EntityModal
          title={`Redaguoti užsakymą #${selected.uzsakymo_id}`}
          entity={selected}
          fields={orderFields}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelected(null);
          }}
          onSave={onSave}
          startInEdit={false}
        />
      )}
    </div>
  );
}
