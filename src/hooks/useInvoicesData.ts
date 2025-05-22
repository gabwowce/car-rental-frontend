// hooks/useInvoicesData.ts
import { useGetAllInvoicesApiV1InvoicesGetQuery } from "@/store/carRentalApi";
import { useState, useMemo } from "react";

export function useInvoicesData() {
  const { data: invoices = [], isLoading } = useGetAllInvoicesApiV1InvoicesGetQuery();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("visi");

  const filtered = useMemo(() => {
    return invoices.filter((s) => {
      const matchSearch = `${s.klientas} ${s.saskaitos_nr}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchStatus = statusFilter === "visi" || s.busena === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [invoices, search, statusFilter]);

  return {
    invoices,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filtered,
    isLoading,
  };
}
