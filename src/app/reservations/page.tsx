"use client";

import { useState } from "react";
import DataTable from "@/app/components/DataTable";
import ActionButtons from "@/app/components/ActionButtons";
import EntityModal from "@/app/components/modals/EntityModal";
import LoadingScreen from "@/app/components/loadingScreen";
import { useReservationData } from "@/hooks/useReservationData";
import StatusBadge from "@/app/components/StatusBadge";

type Rezervacija = NonNullable<
  ReturnType<typeof useReservationData>["reservations"]
>[number];

export default function ReservationsPage() {
  const [selected, setSelected] = useState<Rezervacija | null>(null);
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
    handleDelete,
    reservationFields,
    saveReservation,
  } = useReservationData();

  /* ——— lentelės stulpeliai ——— */
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
            setSelected(r);
            setModalOpen(true);
          }}
          onDelete={() => {
            if (window.confirm("Ar tikrai norite atšaukti rezervaciją?")) {
              handleDelete(r.rezervacijos_id);
            }
          }}
        />
      ),
    },
  ];

  /* ——— modalo save ——— */
  const onSave = async (updated: Rezervacija) => {
    await saveReservation(selected!.rezervacijos_id, {
      rezervacijos_pradzia: updated.rezervacijos_pradzia,
      rezervacijos_pabaiga: updated.rezervacijos_pabaiga,
      busena: updated.busena,
    });
    setModalOpen(false);
    setSelected(null);
  };

  /* ——— UI ——— */
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
          className="border p-2 rounded w-64"
          placeholder="Ieškoti pagal klientą ar automobilį"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value as "visi" | "patvirtinta" | "laukiama" | "atšaukta"
            )
          }
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

      {selected && (
        <EntityModal
          title={`Rezervacija #${selected.rezervacijos_id}`}
          entity={selected}
          fields={reservationFields}
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
