// hooks/useClientsData.ts
import { useState, useMemo } from "react";
import {
  ClientOut,
  useGetAllClientsQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} from "@/store/carRentalApi";
import { FieldConfig } from "@/app/components/modals/EntityModal";

export function useClientsData() {
  /* --- bazinis sąrašas --- */
  const { data: clients = [], isLoading, refetch } = useGetAllClientsQuery();

  /* --- mutation'ai --- */
  const [updateClient, { isLoading: saving }] = useUpdateClientMutation();
  const [deleteClient, { isLoading: removing }] = useDeleteClientMutation();

  /* --- paieška --- */
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

  /* --- laukai EntityModal'ui --- */
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
      type: "datetime-local", // gali būti "text", jei nenaudoji date picker
      required: true,
    },
    {
      name: "bonus_taskai",
      label: "Bonus taškai",
      type: "number",
      required: true,
    },
  ];

  /* --- helperiai --- */
  /** Išsaugoti (UPDATE) */
  const saveClient = async (id: number, data: Partial<ClientOut>) => {
    await updateClient({ klientoId: id, clientUpdate: data }).unwrap();
    await refetch();
  };

  /** Ištrinti */
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
