import { useState } from "react";
import { ClientOut } from "@/store/carRentalApi";

/**
 * `useClientModals` – A custom hook to manage client-related modal state.
 *
 * This hook centralizes the logic for opening and closing different modal modes
 * (view, edit, delete) related to a selected client.
 *
 * ## Features:
 * - Stores currently selected client
 * - Controls modal mode: "view", "edit", or "delete"
 * - Provides actions to open each modal type
 * - Provides a method to close/reset the modal state
 *
 * ## Returns:
 * - `selectedClient` – The currently selected client object (or `null`)
 * - `mode` – Active modal mode (`"view"` | `"edit"` | `"delete"` | `null`)
 * - `openView(client)` – Opens view modal for a given client
 * - `openEdit(client)` – Opens edit modal for a given client
 * - `openDelete(client)` – Opens delete confirmation modal for a given client
 * - `close()` – Resets modal and selection state
 *
 * ## Example:
 * ```tsx
 * const { selectedClient, mode, openView, openEdit, openDelete, close } = useClientModals();
 *
 * return (
 *   <>
 *     <ClientTable onRowClick={openView} />
 *     {mode === "view" && <ClientViewModal client={selectedClient} onClose={close} />}
 *   </>
 * );
 * ```
 */
export function useClientModals() {
  const [selectedClient, setSelectedClient] = useState<ClientOut | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "delete" | null>(null);

  /**
   * Open the modal in "view" mode for the given client.
   */
  const openView = (client: ClientOut) => {
    setSelectedClient(client);
    setMode("view");
  };

  /**
   * Open the modal in "edit" mode for the given client.
   */
  const openEdit = (client: ClientOut) => {
    setSelectedClient(client);
    setMode("edit");
  };

  /**
   * Open the modal in "delete" mode for the given client.
   */
  const openDelete = (client: ClientOut) => {
    setSelectedClient(client);
    setMode("delete");
  };

  /**
   * Close the modal and reset selected client and mode.
   */
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
