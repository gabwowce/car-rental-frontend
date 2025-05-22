"use client";

import { useOrdersData } from "@/hooks/useOrdersData";
import { useOrderModals } from "@/hooks/useOrderModals";
import DataTable from "@/app/components/DataTable";
import ActionButtons from "@/app/components/ActionButtons";
import OrderViewModal from "@/app/components/modals/rderViewModal";
import OrderEditModal from "@/app/components/modals/OrderEditModal";
import ConfirmDeleteModal from "@/app/components/modals/ConfirmDeleteModal";
import React from "react";
import { OrderOut } from "@/store/carRentalApi";

type Column<T> = {
  label: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
};

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

  const columns: Column<OrderOut>[] = [
    {
      label: "Klientas",
      accessor: (r) => getClientName(r.kliento_id),
    },
    {
      label: "Automobilis",
      accessor: (r) => getCarName(r.automobilio_id),
    },
    { label: "Pradžia", accessor: "nuomos_data" },
    { label: "Pabaiga", accessor: "grazinimo_data" },
    {
      label: "Būsena",
      accessor: (r) => {
        const colorMap: Record<string, string> = {
          vykdomas: "bg-blue-100 text-blue-800",
          užbaigtas: "bg-green-100 text-green-800",
          atšauktas: "bg-red-100 text-red-800",
        };
        const status = (r.uzsakymo_busena ?? "").toLowerCase();
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${colorMap[status] || ""}`}
          >
            {r.uzsakymo_busena}
          </span>
        );
      },
    },
    {
      label: "Veiksmai",
      accessor: (r) => (
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
      {selectedOrder && mode === "edit" && (
        <OrderEditModal
          order={selectedOrder}
          isOpen={true}
          onClose={close}
          onSave={(updated: OrderOut) => {
            console.log("Atnaujinta:", updated);
            close();
          }}
        />
      )}
      {selectedOrder && mode === "delete" && (
        <ConfirmDeleteModal
          isOpen={true}
          onClose={close}
          onConfirm={() => {
            console.log("Ištrintas:", selectedOrder.uzsakymo_id);
            close();
          }}
        />
      )}
    </div>
  );
}
