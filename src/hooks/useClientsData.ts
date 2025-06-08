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
 * Provides:
 * - Client list fetching via RTK Query
 * - Client updates and deletions
 * - Search filtering
 * - Field definitions for modals
 */
export function useClientsData() {
  /** All clients fetched from the API */
  const { data: clients = [], isLoading, refetch } = useGetAllClientsQuery();

  /** Mutation: update client */
  const [updateClient, { isLoading: saving }] = useUpdateClientMutation();
  /** Mutation: delete client */
  const [deleteClient, { isLoading: removing }] = useDeleteClientMutation();

  /** Search term for filtering client list */
  const [search, setSearch] = useState("");

  /** Filtered clients based on search input (name, surname, email) */
  const filtered = useMemo(
    () =>
      clients.filter((k) =>
        `${k.vardas} ${k.pavarde} ${k.el_pastas}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [clients, search]
  );

  /** Fields config for <EntityModal />, used in create/edit client modal */
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
      type: "date",
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
   * Updates a client by ID.
   * @param id - The client ID
   * @param data - The fields to update
   */
  const saveClient = async (id: number, data: Partial<ClientOut>) => {
    await updateClient({ klientoId: id, clientUpdate: data }).unwrap();
    await refetch();
  };

  /**
   * Deletes a client by ID.
   * @param id - The client ID to remove
   */
  const removeClient = async (id: number) => {
    await deleteClient({ klientoId: id }).unwrap();
    await refetch();
  };

  return {
    /** Full list of clients */
    clients,
    /** Clients filtered by search input */
    filtered,
    /** Loading status for any active fetch or mutation */
    isLoading: isLoading || saving || removing,
    /** Current search string */
    search,
    /** Updates search string */
    setSearch,
    /** Input fields for client modals */
    clientFields,
    /** Save/Update client handler */
    saveClient,
    /** Delete client handler */
    removeClient,
  };
}
