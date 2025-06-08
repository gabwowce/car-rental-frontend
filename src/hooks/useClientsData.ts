import { useState, useMemo } from "react";
import {
  ClientOut,
  useGetAllClientsQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} from "@/store/carRentalApi";
import { FieldConfig } from "@/app/components/modals/EntityModal";

/**
 * `useClientsData` – A custom hook for managing client data and operations.
 *
 * This hook provides a complete data layer for client-related functionality in
 * your application, including:
 * - Fetching all clients via RTK Query
 * - Performing update and delete operations via mutations
 * - Real-time search and filtering logic
 * - Providing `FieldConfig` definitions for modal-based form generation
 *
 * ## Features:
 * - Automatically fetches all client data using `useGetAllClientsQuery`
 * - Provides mutation handlers to `updateClient` and `deleteClient`
 * - Filters clients by name, surname, or email based on a `search` term
 * - Supplies a fully typed array of input fields for use with `<EntityModal />`
 *
 * ## Returns:
 * ```ts
 * {
 *   clients: ClientOut[];                // Raw list of all clients
 *   filtered: ClientOut[];              // Filtered list based on search term
 *   isLoading: boolean;                 // Loading state for fetch/mutations
 *   search: string;                     // Current search string
 *   setSearch: (value: string) => void; // Update search string
 *   clientFields: FieldConfig<ClientOut>[]; // Modal input definitions
 *   saveClient: (id: number, data: Partial<ClientOut>) => Promise<void>; // Update
 *   removeClient: (id: number) => Promise<void>; // Delete
 * }
 * ```
 *
 * ## Example:
 * ```tsx
 * const {
 *   filtered,
 *   isLoading,
 *   clientFields,
 *   saveClient,
 *   removeClient,
 *   search,
 *   setSearch
 * } = useClientsData();
 *
 * return (
 *   <DataTable data={filtered} />
 * );
 * ```
 */
export function useClientsData() {
  // Fetch all clients
  const { data: clients = [], isLoading, refetch } = useGetAllClientsQuery();

  // Mutations
  const [updateClient, { isLoading: saving }] = useUpdateClientMutation();
  const [deleteClient, { isLoading: removing }] = useDeleteClientMutation();

  // Search state and live filter
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      clients.filter((k) =>
        `${k.vardas} ${k.pavarde} ${k.el_pastas}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [clients, search]
  );

  // Field configs for EntityModal
  const clientFields: FieldConfig<ClientOut>[] = [
    { name: "vardas", label: "Vardas", type: "text", required: true },
    { name: "pavarde", label: "Pavardė", type: "text", required: true },
    { name: "el_pastas", label: "El. paštas", type: "text", required: true },
    {
      name: "telefono_nr",
      label: "Telefono nr.",
      type: "text",
      required: true,
    },
    { name: "gimimo_data", label: "Gimimo data", type: "date", required: true },
    {
      name: "registracijos_data",
      label: "Registracijos data",
      type: "datetime-local",
      required: true,
    },
    {
      name: "bonus_taskai",
      label: "Bonus taškai",
      type: "number",
      required: true,
    },
  ];

  /**
   * Update (PATCH) a client by ID.
   * @param id - Client ID
   * @param data - Partial client fields to update
   */
  const saveClient = async (id: number, data: Partial<ClientOut>) => {
    await updateClient({ klientoId: id, clientUpdate: data }).unwrap();
    await refetch();
  };

  /**
   * Delete a client by ID.
   * @param id - Client ID to delete
   */
  const removeClient = async (id: number) => {
    await deleteClient({ klientoId: id }).unwrap();
    await refetch();
  };

  return {
    clients,
    filtered,
    isLoading: isLoading || saving || removing,
    search,
    setSearch,
    clientFields,
    saveClient,
    removeClient,
  };
}
