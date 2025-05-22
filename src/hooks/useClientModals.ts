import { useState } from "react";
import { Klientas } from "@/types"; // arba naudok tipą inline

export function useClientModals() {
  const [selectedClient, setSelectedClient] = useState<Klientas | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "delete" | null>(null);

  const openView = (client: Klientas) => {
    setSelectedClient(client);
    setMode("view");
  };

  const openEdit = (client: Klientas) => {
    setSelectedClient(client);
    setMode("edit");
  };

  const openDelete = (client: Klientas) => {
    setSelectedClient(client);
    setMode("delete");
  };

  const close = () => {
    setSelectedClient(null);
    setMode(null);
  };

  return {
    selectedClient,
    mode,
    openView,
    openEdit,
    openDelete,
    close,
  };
}
