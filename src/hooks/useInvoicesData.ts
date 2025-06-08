/**
 * `useInvoicesData` – A custom React hook for managing and filtering invoice data.
 *
 * This hook fetches all invoices via RTK Query and provides built-in support for:
 * - Search filtering (by client name or invoice ID)
 * - Status filtering (e.g., all, paid, overdue, issued)
 * - Memoized filtered result for performance
 *
 * ## Features:
 * - Fetches all invoices from the API (`useGetAllInvoicesQuery`)
 * - Provides `search` and `statusFilter` state
 * - Returns filtered list based on current filters
 * - Keeps original and filtered data separate
 *
 * ## Filters:
 * - **Search**: filters by client first name or invoice ID
 * - **Status**: filters by invoice status (e.g., `"apmokėta"`, `"vėluojanti"`, etc.)
 *
 * ## Returns:
 * ```ts
 * {
 *   invoices: InvoiceOut[];             // All fetched invoices
 *   search: string;                     // Current search value
 *   setSearch: (val: string) => void;   // Update search input
 *   statusFilter: string;               // Selected status filter
 *   setStatusFilter: (val: string) => void; // Update status filter
 *   filtered: InvoiceOut[];             // Filtered result based on search + status
 *   isLoading: boolean;                 // Loading state
 * }
 * ```
 *
 * ## Example usage:
 * ```tsx
 * const {
 *   filtered,
 *   search,
 *   setSearch,
 *   statusFilter,
 *   setStatusFilter,
 *   isLoading,
 * } = useInvoicesData();
 * ```
 */

import { useGetAllInvoicesQuery } from "@/store/carRentalApi";
import { useState, useMemo } from "react";

export function useInvoicesData() {
  const { data: invoices = [], isLoading } = useGetAllInvoicesQuery();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("visi");

  const filtered = useMemo(() => {
    return invoices.filter((s) => {
      const matchSearch = `${s.client_first_name} ${s.invoice_id}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus = statusFilter === "visi" || s.status === statusFilter;

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
