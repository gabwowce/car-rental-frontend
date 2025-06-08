import { useState } from "react";
import { InvoiceOut } from "@/store/carRentalApi";

/**
 * Custom React hook to manage modal state for invoice operations.
 *
 * Manages modal visibility and stores the currently selected invoice.
 * Useful for controlling UI interactions like viewing, exporting, or deleting invoices.
 *
 * @returns Object with current state and modal control functions.
 */
export function useInvoiceModals() {
  /**
   * The currently selected invoice. Set when a modal is opened.
   */
  const [selected, setSelected] = useState<InvoiceOut | null>(null);

  /**
   * The current modal mode. Can be "view", "pdf", "delete", or null.
   */
  const [mode, setMode] = useState<"view" | "pdf" | "delete" | null>(null);

  /**
   * Open the "view" modal for a specific invoice.
   *
   * @param invoice - The invoice to display.
   */
  const openView = (invoice: InvoiceOut) => {
    setSelected(invoice);
    setMode("view");
  };

  /**
   * Open the "pdf" modal to export an invoice.
   *
   * @param invoice - The invoice to export.
   */
  const openPdf = (invoice: InvoiceOut) => {
    setSelected(invoice);
    setMode("pdf");
  };

  /**
   * Open the "delete" modal for invoice deletion confirmation.
   *
   * @param invoice - The invoice to be deleted.
   */
  const openDelete = (invoice: InvoiceOut) => {
    setSelected(invoice);
    setMode("delete");
  };

  /**
   * Close any open modal and reset selected invoice.
   */
  const close = () => {
    setSelected(null);
    setMode(null);
  };

  return {
    selected,
    mode,
    openView,
    openPdf,
    openDelete,
    close,
  };
}
