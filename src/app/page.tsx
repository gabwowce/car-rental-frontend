"use client";

import {
  FiCalendar,
  FiTruck,
  FiTool,
  FiCreditCard,
  FiAlertCircle,
  FiCornerDownLeft,
} from "react-icons/fi";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import ActionButtons from "@/app/components/ActionButtons";
import DataTable from "@/app/components/DataTable";
import StatCard from "./components/StatCard";
import BarChartBox from "./components/BarChartBox";
import PieChartBox from "./components/PieChartBox";
import LoadingScreen from "@/app/components/loadingScreen";
import EntityModal, { FieldConfig } from "@/app/components/modals/EntityModal";
import { useUpdateReservationMutation } from "@/store/carRentalApi";
import StatusBadge from "@/app/components/StatusBadge";
import React, { useState } from "react";

/**
 * Type representing a single reservation entry,
 * derived from the `useDashboardStats` hook response.
 */
type Reservation = ReturnType<
  typeof useDashboardStats
>["latestReservations"][number];

/**
 * DashboardPage – main admin dashboard view.
 *
 * Displays:
 * - Key statistics (cards)
 * - Analytics charts (bar + pie)
 * - Latest reservations with inline editing
 *
 * Integrates multiple hooks and components:
 * - `useDashboardStats` for data aggregation
 * - `StatCard`, `BarChartBox`, `PieChartBox`, and `DataTable` for visualization
 * - `EntityModal` for editing a selected reservation
 *
 * @returns {JSX.Element} Full dashboard page layout
 */
export default function DashboardPage() {
  const {
    latestReservations,
    barData,
    pieData,
    laisvi,
    servise,
    neapmoketosSaskaitos,
    neatsakytosUzklausos,
    siandienGrązinimai,
    getAutomobilis,
    getKlientas,
    isLoading,
    refetchReservations,
  } = useDashboardStats();

  const [selected, setSelected] = useState<Reservation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateReservation] = useUpdateReservationMutation();

  /**
   * Field configuration used by the EntityModal to edit a reservation.
   */
  const reservationFields: FieldConfig<Reservation>[] = [
    { name: "rezervacijos_pradzia", label: "Pradžia", type: "text" },
    { name: "rezervacijos_pabaiga", label: "Pabaiga", type: "text" },
    {
      name: "busena",
      label: "Būsena",
      type: "select",
      options: [
        { value: "patvirtinta", label: "Patvirtinta" },
        { value: "laukia", label: "Laukia" },
        { value: "atšaukta", label: "Atšaukta" },
      ],
    },
  ];

  /**
   * Columns for the DataTable showing latest reservations.
   */
  const columns = [
    {
      label: "Automobilis",
      accessor: (r: Reservation) => getAutomobilis(r.automobilio_id),
    },
    {
      label: "Klientas",
      accessor: (r: Reservation) => getKlientas(r.kliento_id),
    },
    { label: "Pradžia", accessor: "rezervacijos_pradzia" },
    { label: "Pabaiga", accessor: "rezervacijos_pabaiga" },
    {
      label: "Būsena",
      accessor: (r: Reservation) => <StatusBadge status={r.busena} />,
    },
    {
      label: "Veiksmai",
      accessor: (r: Reservation) => (
        <ActionButtons
          onEdit={() => {
            setSelected(r);
            setModalOpen(true);
          }}
          show={{ edit: true }}
        />
      ),
    },
  ];

  /**
   * Handles saving an updated reservation via mutation.
   * Closes the modal and triggers data refetch.
   *
   * @param updated - Updated reservation values from the modal
   */

  const handleSave = async (updated: Reservation) => {
    await updateReservation({
      rezervacijosId: selected!.rezervacijos_id,
      reservationUpdate: {
        rezervacijos_pradzia: updated.rezervacijos_pradzia,
        rezervacijos_pabaiga: updated.rezervacijos_pabaiga,
        busena: updated.busena,
      },
    }).unwrap();

    setModalOpen(false);
    setSelected(null);
    refetchReservations();
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <StatCard
          color="bg-blue-100"
          title="Rezervacijos šiandien"
          value="5"
          icon={<FiCalendar />}
        />
        <StatCard
          color="bg-teal-200"
          title="Laisvi automobiliai"
          value={laisvi}
          icon={<FiTruck />}
        />
        <StatCard
          color="bg-yellow-100"
          title="Servise esantys automobiliai"
          value={servise}
          icon={<FiTool />}
        />
        <StatCard
          color="bg-red-100"
          title="Neapmokėtos sąskaitos"
          value={neapmoketosSaskaitos}
          icon={<FiCreditCard />}
        />
        <StatCard
          color="bg-purple-100"
          title="Neatsakytos užklausos"
          value={neatsakytosUzklausos}
          icon={<FiAlertCircle />}
        />
        <StatCard
          color="bg-indigo-100"
          title="Grąžinimai šiandien"
          value={siandienGrązinimai}
          icon={<FiCornerDownLeft />}
        />
      </div>

      {/* Diagramos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BarChartBox title="Užsakymai pagal būsenas" data={barData} />
        <PieChartBox title="Automobilių statusai" data={pieData} />
      </div>

      {/* Naujausios rezervacijos */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Naujausios rezervacijos</h2>
        <DataTable<Reservation>
          columns={columns}
          data={latestReservations}
          rowKey={(r) => r.rezervacijos_id}
          itemsPerPage={5}
        />
      </div>

      {selected && (
        <EntityModal
          title={`Redaguoti rezervaciją #${selected.rezervacijos_id}`}
          entity={selected}
          fields={reservationFields}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelected(null);
          }}
          onSave={handleSave}
          startInEdit={false}
        />
      )}
    </div>
  );
}
