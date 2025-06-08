import { useState } from "react";
import { OrderOut } from "@/store/carRentalApi";

/**
 * React hook for managing modal state related to orders.
 *
 * Handles selection and modal mode ("view", "edit", or "delete") for a given `OrderOut`.
 *
 * @returns Object containing modal state and handler functions.
 */
export function useOrderModals() {
  /**
   * Currently selected order.
   * This will be shown or edited depending on the modal mode.
   */
  const [selectedOrder, setSelectedOrder] = useState<OrderOut | null>(null);

  /**
   * Modal mode: determines what the modal should display.
   * Can be "view", "edit", "delete", or null (closed).
   */
  const [mode, setMode] = useState<"view" | "edit" | "delete" | null>(null);

  /**
   * Opens the modal in "view" mode for the given order.
   * @param o - The order to view.
   */
  const openView = (o: OrderOut) => {
    setSelectedOrder(o);
    setMode("view");
  };

  /**
   * Opens the modal in "edit" mode for the given order.
   * @param o - The order to edit.
   */
  const openEdit = (o: OrderOut) => {
    setSelectedOrder(o);
    setMode("edit");
  };

  /**
   * Opens the modal in "delete" mode for the given order.
   * @param o - The order to delete.
   */
  const openDelete = (o: OrderOut) => {
    setSelectedOrder(o);
    setMode("delete");
  };

  /**
   * Closes any open modal and resets state.
   */
  const close = () => {
    setSelectedOrder(null);
    setMode(null);
  };

  return {
    selectedOrder, // Currently selected order, if any
    mode, // Current modal mode
    openView, // Open in view mode
    openEdit, // Open in edit mode
    openDelete, // Open in delete mode
    close, // Reset modal state
  };
}
