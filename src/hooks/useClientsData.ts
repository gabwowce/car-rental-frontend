// hooks/useClientsData.ts
import { useGetAllClientsApiV1ClientsGetQuery } from "@/store/carRentalApi";
import { useState, useMemo } from "react";

export function useClientsData() {
  const { data: clients = [], isLoading } = useGetAllClientsApiV1ClientsGetQuery();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return clients.filter((k) =>
      `${k.vardas} ${k.pavarde} ${k.el_pastas}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [clients, search]);

  return {
    clients,
    search,
    setSearch,
    filtered,
    isLoading,
  };
}
