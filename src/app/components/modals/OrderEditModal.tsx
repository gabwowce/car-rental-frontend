"use client";

import { useOrdersData } from "@/hooks/useOrdersData";
import { useOrderModals } from "@/hooks/useOrderModals";
import DataTable from "@/app/components/DataTable";
import ActionButtons from "@/app/components/ActionButtons";
import OrderViewModal from "@/app/components/modals/rderViewModal";
import React from "react";

type Uzsakymas = NonNullable<
  ReturnType<typeof useOrdersData>["orders"]
>[number];

export default function OrdersPage() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    getClientName,
    getCarName,
    filtered,
    isLoading,
  } = useOrdersData();

  const { selectedOrder, mode, openView, openEdit, openDelete, close } =
    useOrderModals();

  const handleDelete = () => {
    if (!selectedOrder) return;
    const confirmed = window.confirm(
      `Ar tikrai norite ištrinti užsakymą #${selectedOrder.uzsakymo_id}?`
    );
    if (confirmed) {
      console.log("Užsakymas ištrintas:", selectedOrder.uzsakymo_id);
      // Tikras ištrynimas būtų čia (pvz. await deleteOrderById())
    }
    close();
  };

  const columns = [
    {
      label: "Klientas",
      accessor: (r: Uzsakymas) => getClientName(r.kliento_id),
    },
    {
      label: "Automobilis",
      accessor: (r: Uzsakymas) => getCarName(r.automobilio_id),
    },
    { label: "Pradžia", accessor: "pradzia" },
    { label: "Pabaiga", accessor: "pabaiga" },
    {
      label: "Būsena",
      accessor: (r: Uzsakymas) => {
        const colorMap: Record<string, string> = {
          vykdomas: "bg-blue-100 text-blue-800",
          užbaigtas: "bg-green-100 text-green-800",
          atšauktas: "bg-red-100 text-red-800",
        };
        const status = (r.busena ?? "").toLowerCase();
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${colorMap[status] || ""}`}
          >
            {r.busena}
          </span>
        );
      },
    },
    {
      label: "Veiksmai",
      accessor: (r: Uzsakymas) => (
        <ActionButtons
          onView={() => openView(r)}
          onEdit={() => openEdit(r)}
          onDelete={() => openDelete(r)}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Užsakymai</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Naujas užsakymas
        </button>
      </div>

      {/* Filtrai */}
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
          <option value="visi">Visi</option>
          <option value="vykdomas">Vykdomi</option>
          <option value="užbaigtas">Užbaigti</option>
          <option value="atšauktas">Atšaukti</option>
        </select>
      </div>

      {isLoading ? (
        <p>Įkeliama...</p>
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(r) => r.uzsakymo_id}
        />
      )}

      {selectedOrder && mode === "view" && (
        <OrderViewModal order={selectedOrder} isOpen={true} onClose={close} />
      )}

      {selectedOrder &&
        mode === "delete" &&
        (() => {
          handleDelete();
          return null;
        })()}
    </div>
  );
}
