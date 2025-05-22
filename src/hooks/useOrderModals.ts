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
