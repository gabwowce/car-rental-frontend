import { useState } from "react";
import { InvoiceOut } from "@/store/carRentalApi"; // arba naudok iš hook tipo

export function useInvoiceModals() {
  const [selected, setSelected] = useState<InvoiceOut | null>(null);
  const [mode, setMode] = useState<"view" | "pdf" | "delete" | null>(null);

  const openView = (s: InvoiceOut) => {
    setSelected(s);
    setMode("view");
  };

  const openPdf = (s: InvoiceOut) => {
    setSelected(s);
    setMode("pdf");
  };

  const openDelete = (s: InvoiceOut) => {
    setSelected(s);
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
