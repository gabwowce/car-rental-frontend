/**
 * `useOrderModals` – React hook to manage modal state for a selected order.
 *
 * Provides modal state handling for **viewing**, **editing**, or **deleting** an order (`OrderOut`).
 * Commonly used in order management UIs where selecting an order triggers modal actions.
 *
 * ## Features:
 * - Stores the currently selected order (`selectedOrder`)
 * - Manages modal `mode`: `"view"`, `"edit"`, or `"delete"`
 * - Includes convenience functions to open/close modals with the right context
 *
 * ## Returns:
 * ```ts
 * {
 *   selectedOrder: OrderOut | null;       // The selected order (or null)
 *   mode: "view" | "edit" | "delete" | null; // Current modal mode
 *   openView: (order: OrderOut) => void;  // Set modal to view mode
 *   openEdit: (order: OrderOut) => void;  // Set modal to edit mode
 *   openDelete: (order: OrderOut) => void;// Set modal to delete mode
 *   close: () => void;                    // Close modal and reset state
 * }
 * ```
 *
 * ## Example usage:
 * ```tsx
 * const {
 *   selectedOrder,
 *   mode,
 *   openView,
 *   openEdit,
 *   openDelete,
 *   close,
 * } = useOrderModals();
 *
 * if (mode === "view") {
 *   return <OrderViewModal order={selectedOrder} onClose={close} />;
 * }
 * ```
 */

import { useState } from "react";
import { OrderOut } from "@/store/carRentalApi";

export function useOrderModals() {
  const [selectedOrder, setSelectedOrder] = useState<OrderOut | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "delete" | null>(null);

  const openView = (o: OrderOut) => {
    setSelectedOrder(o);
    setMode("view");
  };

  const openEdit = (o: OrderOut) => {
    setSelectedOrder(o);
    setMode("edit");
  };

  const openDelete = (o: OrderOut) => {
    setSelectedOrder(o);
    setMode("delete");
  };

  const close = () => {
    setSelectedOrder(null);
    setMode(null);
  };

  return {
    selectedOrder,
    mode,
    openView,
    openEdit,
    openDelete,
    close,
  };
}
