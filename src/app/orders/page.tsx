"use client";

import { useState } from "react";
import DataTable from "@/app/components/DataTable";
import { ActionButtons } from "@/app/components/ActionButtons";
import EntityModal from "@/app/components/modals/EntityModal";
import StatusBadge from "@/app/components/StatusBadge";
import LoadingScreen from "@/app/components/loadingScreen";
import { useOrdersData } from "@/hooks/useOrdersData";
import type { OrderOut } from "@/store/carRentalApi";
import CreateEntityButton from "@/app/components/CreateEntityButton";

/**
 * OrdersPage – UI for managing rental orders in the AutoRent system.
 *
 * Features:
 * - Displays a searchable, filterable list of orders
 * - Allows creating, editing, and deleting rental orders
 * - Integrates with modal form for inline editing
 * - Uses `useOrdersData()` to fetch and manage order-related data
 *
 * Columns displayed:
 * - Client
 * - Car
 * - Rental Start & End Dates
 * - Status
 * - Action buttons (edit/delete)
 *
 * @returns {JSX.Element} Orders page view with data table and modals
 */
export default function OrdersPage() {
  /** Selected order for editing */
  const [selected, setSelected] = useState<OrderOut | null>(null);

  /** Controls visibility of modal form */
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * Custom hook that provides:
   * - filtered order data
   * - search & filter states
   * - helper methods for displaying names
   * - form field configs and CRUD actions
   */
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

  /**
   * Table column configuration for DataTable component.
   * Includes custom renderers for status and action buttons.
   */
  const columns = [
    {
      label: "Client",
      accessor: (o: OrderOut) => getClientName(o.kliento_id),
    },
    {
      label: "Car",
      accessor: (o: OrderOut) => getCarName(o.automobilio_id),
    },
    { label: "Start", accessor: "nuomos_data" },
    { label: "End", accessor: "grazinimo_data" },
    {
      label: "Status",
      accessor: (o: OrderOut) => (
        <StatusBadge status={o.uzsakymo_busena || ""} />
      ),
    },
    {
      label: "Actions",
      accessor: (o: OrderOut) => (
        <ActionButtons
          onEdit={() => {
            setSelected(o);
            setModalOpen(true);
          }}
          onDelete={async () => {
            const confirmed = window.confirm(
              `Are you sure you want to delete order #${o.uzsakymo_id}?`
            );
            if (!confirmed) return;
            try {
              await handleDelete(o.uzsakymo_id);
            } catch (e) {
              alert(
                "Failed to delete the order. It may be linked to other records (e.g. invoices or payments)."
              );
            }
          }}
        />
      ),
    },
  ];

  /**
   * Handles saving changes from the modal form.
   *
   * @param updated - The updated order object from the form
   */
  const onSave = async (updated: OrderOut) => {
    await saveOrder(selected!.uzsakymo_id, {
      nuomos_data: updated.nuomos_data,
      grazinimo_data: updated.grazinimo_data,
      uzsakymo_busena: updated.uzsakymo_busena,
    });
    setModalOpen(false);
    setSelected(null);
  };

  /** Loading state UI */
  if (isLoading) return <LoadingScreen />;

  /** Main rendered UI */
  return (
    <div>
      {/* Header with create button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <CreateEntityButton
          buttonLabel="+ New Order"
          modalTitle="New Order"
          fields={orderFields}
          onCreate={async (data) => {
            await saveOrder(null, data);
          }}
        />
      </div>

      {/* Filter controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          className="border p-2 rounded w-64"
          placeholder="Search by client or car"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="visi">All</option>
          <option value="vykdomas">Active</option>
          <option value="užbaigtas">Completed</option>
          <option value="atšauktas">Cancelled</option>
        </select>
      </div>

      {/* Order table */}
      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(r) => r.uzsakymo_id}
      />

      {/* Modal form for editing */}
      {selected && (
        <EntityModal
          title={`Edit Order #${selected.uzsakymo_id}`}
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
