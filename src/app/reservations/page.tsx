"use client";

import { useState } from "react";
import DataTable from "@/app/components/DataTable";
import { ActionButtons } from "@/app/components/ActionButtons";
import EntityModal from "@/app/components/modals/EntityModal";
import LoadingScreen from "@/app/components/loadingScreen";
import { useReservationData } from "@/hooks/useReservationData";
import StatusBadge from "@/app/components/StatusBadge";
import CreateEntityButton from "@/app/components/CreateEntityButton";
import type { ReservationUpdate } from "@/store/carRentalApi";

/**
 * Type representing a single reservation, derived from `useReservationData`.
 */
type Rezervacija = NonNullable<
  ReturnType<typeof useReservationData>["reservations"]
>[number];

/**
 * ReservationsPage – page for managing client car reservations.
 *
 * Features:
 * - Displays a searchable & filterable list of reservations
 * - Allows creating, editing, and deleting reservations
 * - Uses `EntityModal` for inline editing
 * - Integrates with `useReservationData()` hook for business logic
 *
 * @returns {JSX.Element} Rendered reservations admin UI
 */
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

  /**
   * Column definitions for the DataTable component.
   * Includes dynamic client and car name resolution.
   */
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

  /**
   * Handles saving the updated reservation data from the modal.
   * Cleans up optional fields before calling the mutation.
   *
   * @param updated - Modified reservation values
   */
  const onSave = async (updated: ReservationUpdate) => {
    const cleaned = {
      ...updated,
      rezervacijos_pradzia: updated.rezervacijos_pradzia ?? undefined,
      rezervacijos_pabaiga: updated.rezervacijos_pabaiga ?? undefined,
      busena: updated.busena ?? undefined,
      kliento_id: updated.kliento_id ?? undefined,
      automobilio_id: updated.automobilio_id ?? undefined,
    };
    await saveReservation(selected!.rezervacijos_id, cleaned);
  };

  // Loading state
  if (isLoading) return <LoadingScreen />;

  /**
   * Rendered reservation management UI.
   * Includes header, search/filter controls, table, and modal.
   */
  return (
    <div>
      <div className="flex justify-between items-center mb-6 text-[#707070]">
        <h1 className="text-2xl font-bold text-[#F7F7F7]">Rezervacijos</h1>
        <CreateEntityButton
          buttonLabel="+ Nauja rezervacija"
          modalTitle="Nauja rezervacija"
          fields={reservationFields}
          onCreate={async (data) => {
            try {
              await saveReservation(null, data);
              alert("Rezervacija sėkmingai išsaugota!");
            } catch (err: any) {
              if (err?.status === 409 || err?.response?.status === 409) {
                alert("Automobilis šiuo laikotarpiu jau rezervuotas.");
              } else {
                alert("Nepavyko sukurti rezervacijos.");
                console.error("Klaida:", err);
              }
            }
          }}
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6 text-[#707070]">
        <input
          type="text"
          className="border p-2 rounded w-64"
          placeholder="Ieškoti..."
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
