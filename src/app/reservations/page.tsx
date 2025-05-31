"use client";

import { useState } from "react";
import DataTable from "@/app/components/DataTable";
import ActionButtons from "@/app/components/ActionButtons";
import EntityModal from "@/app/components/modals/EntityModal";
import ConfirmDeleteModal from "@/app/components/modals/ConfirmDeleteModal";
import LoadingScreen from "@/app/components/loadingScreen";
import { useReservationData } from "@/hooks/useReservationData";
import StatusBadge from "@/app/components/StatusBadge";

type Rezervacija = NonNullable<
  ReturnType<typeof useReservationData>["reservations"]
>[number];

export default function ReservationsPage() {
  const [selectedReservation, setSelectedReservation] =
    useState<Rezervacija | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const {
    reservations,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    getClientName,
    getCarName,
    handleDelete,
    filtered,
    isLoading,
    reservationFields,
  } = useReservationData();

  const handleSave = (updated: Rezervacija) => {
    console.log("Išsaugota (implementuok API):", updated);
    setModalOpen(false);
    setSelectedReservation(null);
  };

  const columns = [
    {
      label: "Klientas",
      accessor: (r: Rezervacija) => getClientName(r.kliento_id),
    },
    {
      label: "Automobilis",
      accessor: (r: Rezervacija) => getCarName(r.automobilio_id),
    },
    { label: "Pradžia", accessor: "rezervacijos_pradzia" },
    { label: "Pabaiga", accessor: "rezervacijos_pabaiga" },
    {
      label: "Būsena",
      accessor: (r: Rezervacija) => <StatusBadge status={r.busena} />,
    },
    {
      label: "Veiksmai",
      accessor: (r: Rezervacija) => (
        <ActionButtons
          onEdit={() => {
            setSelectedReservation(r);
            setModalOpen(true);
          }}
          onDelete={() => {
            setSelectedReservation(r);
            setDeleteConfirmOpen(true);
          }}
        />
      ),
    },
  ];

  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rezervacijos</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nauja rezervacija
        </button>
      </div>

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

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(r) => r.rezervacijos_id}
      />

      {/* Redagavimo/peržiūros modalas */}
      {selectedReservation && (
        <EntityModal
          title={`Rezervacija #${selectedReservation.rezervacijos_id}`}
          entity={selectedReservation}
          fields={reservationFields}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedReservation(null);
          }}
          onSave={handleSave}
          startInEdit={false}
        />
      )}

      {/* Ištrynimo patvirtinimo modalas */}
      {selectedReservation && deleteConfirmOpen && (
        <ConfirmDeleteModal
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={() => {
            handleDelete(selectedReservation.rezervacijos_id);
            setSelectedReservation(null);
          }}
          entityName="rezervaciją"
        />
      )}
    </div>
  );
}
