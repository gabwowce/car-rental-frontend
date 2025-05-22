import { useState } from "react";
import { Saskaita } from "@/types"; // arba naudok iš hook tipo

export function useInvoiceModals() {
  const [selected, setSelected] = useState<Saskaita | null>(null);
  const [mode, setMode] = useState<"view" | "pdf" | "delete" | null>(null);

  const openView = (s: Saskaita) => {
    setSelected(s);
    setMode("view");
  };

  const openPdf = (s: Saskaita) => {
    setSelected(s);
    setMode("pdf");
  };

  const openDelete = (s: Saskaita) => {
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
