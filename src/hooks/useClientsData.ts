// hooks/useClientsData.ts
import { useGetAllClientsQuery } from "@/store/carRentalApi";
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

  return {
    clients,
    search,
    setSearch,
    filtered,
    isLoading,
  };
}
