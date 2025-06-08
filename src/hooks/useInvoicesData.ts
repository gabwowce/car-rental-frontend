import { useGetAllInvoicesQuery } from "@/store/carRentalApi";
import { useState, useMemo } from "react";

/**
 * Custom hook for managing and filtering invoices.
 *
 * Fetches all invoices and provides search + status-based filtering logic.
 *
 * @returns Object containing invoice data, filters, and filtered results.
 */
export function useInvoicesData() {
  /**
   * Fetch all invoices using RTK Query.
   * Defaults to an empty array if no data is returned yet.
   */
  const { data: invoices = [], isLoading } = useGetAllInvoicesQuery();

  /**
   * Search input value (used to match client name or invoice ID).
   */
  const [search, setSearch] = useState("");

  /**
   * Currently selected invoice status filter.
   * Example values: "visi", "apmokėta", "vėluojanti", etc.
   */
  const [statusFilter, setStatusFilter] = useState("visi");

  /**
   * Memoized list of filtered invoices based on search + status.
   * Improves performance by avoiding unnecessary recalculations.
   */
  const filtered = useMemo(() => {
    return invoices.filter((s) => {
      // Match if either client's name or invoice ID contains the search value
      const matchSearch = `${s.client_first_name} ${s.invoice_id}`
        .toLowerCase()
        .includes(search.toLowerCase());

      // Match if status is "visi" (all) or exactly matches the invoice's status
      const matchStatus = statusFilter === "visi" || s.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [invoices, search, statusFilter]);

  return {
    invoices, // All raw invoice data
    search, // Current search string
    setSearch, // Function to update search string
    statusFilter, // Current selected status filter
    setStatusFilter, // Function to update status filter
    filtered, // Invoices matching current search and status
    isLoading, // True while data is being fetched
  };
}
