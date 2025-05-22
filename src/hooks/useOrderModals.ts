import { useState } from "react";
import { Uzsakymas } from "@/types";

export function useOrderModals() {
  const [selectedOrder, setSelectedOrder] = useState<Uzsakymas | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "delete" | null>(null);

  const openView = (o: Uzsakymas) => {
    setSelectedOrder(o);
    setMode("view");
  };

  const openEdit = (o: Uzsakymas) => {
    setSelectedOrder(o);
    setMode("edit");
  };

  const openDelete = (o: Uzsakymas) => {
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
