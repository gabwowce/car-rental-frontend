// hooks/useClientsData.ts
import { FieldConfig } from "@/app/components/modals/EntityModal";
import { ClientOut, useGetAllClientsQuery } from "@/store/carRentalApi";
import { useState, useMemo } from "react";

export function useClientsData() {
  const { data: clients = [], isLoading } = useGetAllClientsQuery();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return clients.filter((k) =>
      `${k.vardas} ${k.pavarde} ${k.el_pastas}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [clients, search]);

  const clientFields: FieldConfig<ClientOut>[] = [
    { name: "kliento_id", label: "ID", type: "text" },
    { name: "vardas", label: "Vardas", type: "text" },
    { name: "pavarde", label: "Pavardė", type: "text" },
    { name: "el_pastas", label: "El. paštas", type: "text" },
    { name: "telefono_nr", label: "Telefono nr.", type: "text" },
    {
      name: "registracijos_data",
      label: "Registracijos data",
      type: "text",
      format: (v) => new Date(v).toLocaleDateString("lt-LT"),
    },
    { name: "bonus_taskai", label: "Bonus taškai", type: "number" },
  ];

  return {
    clients,
    search,
    setSearch,
    filtered,
    isLoading,
    clientFields,
  };
}
