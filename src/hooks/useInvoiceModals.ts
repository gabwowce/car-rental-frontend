/**
 * `useInvoiceModals` – Custom hook to manage invoice-related modal state
 *
 * This hook manages the selected invoice and modal mode for displaying, exporting, or deleting an invoice.
 * It provides utility functions to open or close specific modal types.
 *
 * ## Features:
 * - Stores the currently selected invoice (`InvoiceOut`)
 * - Tracks which modal mode is active: `"view"`, `"pdf"`, or `"delete"`
 * - Provides handler functions to open each mode
 * - Supports a `close()` function to reset the state
 *
 * ## Returns:
 * ```ts
 * {
 *   selected: InvoiceOut | null;              // Currently selected invoice
 *   mode: "view" | "pdf" | "delete" | null;   // Modal mode
 *   openView(invoice: InvoiceOut): void;      // Open view modal
 *   openPdf(invoice: InvoiceOut): void;       // Open PDF export modal
 *   openDelete(invoice: InvoiceOut): void;    // Open delete confirmation modal
 *   close(): void;                            // Close any open modal
 * }
 * ```
 *
 * ## Example:
 * ```tsx
 * const {
 *   selected,
 *   mode,
 *   openView,
 *   openPdf,
 *   openDelete,
 *   close,
 * } = useInvoiceModals();
 *
 * if (mode === "view" && selected) {
 *   return <InvoiceViewModal invoice={selected} onClose={close} />;
 * }
 * ```
 */

import { useState } from "react";
import { InvoiceOut } from "@/store/carRentalApi";

export function useInvoiceModals() {
  const [selected, setSelected] = useState<InvoiceOut | null>(null);
  const [mode, setMode] = useState<"view" | "pdf" | "delete" | null>(null);

  const openView = (invoice: InvoiceOut) => {
    setSelected(invoice);
    setMode("view");
  };

  const openPdf = (invoice: InvoiceOut) => {
    setSelected(invoice);
    setMode("pdf");
  };

  const openDelete = (invoice: InvoiceOut) => {
    setSelected(invoice);
    setMode("delete");
  };

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
