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
import React from "react";
import LoadingScreen from "@/app/components/loadingScreen";

export type Column<T> = {
  label: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
};

type ReservationOut = ReturnType<
  typeof useDashboardStats
>["rezervacijos"][number];

export default function DashboardPage() {
  const {
    rezervacijos,
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
  } = useDashboardStats();

  const columns: Column<ReservationOut>[] = [
    { label: "Automobilis", accessor: (r) => getAutomobilis(r.automobilio_id) },
    { label: "Klientas", accessor: (r) => getKlientas(r.kliento_id) },
    { label: "Pradžia", accessor: (r) => r.rezervacijos_pradzia },
    { label: "Pabaiga", accessor: (r) => r.rezervacijos_pabaiga },
    {
      label: "Veiksmai",
      accessor: (r) => (
        <ActionButtons
          onView={() =>
            console.log("Peržiūrėti rezervaciją", r.rezervacijos_id)
          }
          onEdit={() => console.log("Redaguoti rezervaciją", r.rezervacijos_id)}
          onDelete={() =>
            console.log("Atšaukti rezervaciją", r.rezervacijos_id)
          }
          show={{ view: true, edit: true, delete: false }}
        />
      ),
    },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BarChartBox title="Užsakymai pagal būsenas" data={barData} />
        <PieChartBox title="Automobilių statusai" data={pieData} />
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Naujausios rezervacijos</h2>
        <DataTable<ReservationOut>
          columns={columns}
          data={rezervacijos}
          rowKey={(r) => r.rezervacijos_id}
          itemsPerPage={5}
        />
      </div>
    </div>
  );
}
