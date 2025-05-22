import { useState } from "react";
import { ClientOut } from "@/store/carRentalApi"; // arba naudok tipą inline

export function useClientModals() {
  const [selectedClient, setSelectedClient] = useState<ClientOut | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "delete" | null>(null);

  const openView = (client: ClientOut) => {
    setSelectedClient(client);
    setMode("view");
  };

  const openEdit = (client: ClientOut) => {
    setSelectedClient(client);
    setMode("edit");
  };

  const openDelete = (client: ClientOut) => {
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
