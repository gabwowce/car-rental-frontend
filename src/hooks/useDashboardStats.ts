/**
 * `useDashboardStats` – Dashboard data aggregation hook
 *
 * This custom hook provides all necessary statistics, visual data formats (for charts),
 * and helper lookups for use in a dashboard UI.
 *
 * ## Features:
 * - Fetches the latest reservations, orders, cars, clients, invoices, and support tickets
 * - Calculates status breakdowns for vehicles and orders
 * - Builds datasets for bar and pie chart visualizations
 * - Provides helper functions to resolve car and client names by ID
 * - Returns loading state and refetch capability
 *
 * ## Returns:
 * ```ts
 * {
 *   latestReservations: Reservation[];        // Last 5 reservations, excluding cancelled
 *   barData: ChartData[];                    // For bar chart (order statuses)
 *   pieData: ChartData[];                    // For pie chart (car statuses)
 *   laisvi: number;                          // Available cars
 *   servise: number;                         // Cars in service
 *   neapmoketosSaskaitos: number;            // Overdue invoices
 *   neatsakytosUzklausos: number;            // Unanswered support requests
 *   siandienGrązinimai: number;              // Orders returned today
 *   getAutomobilis(id: number): string;      // Resolve car name by ID
 *   getKlientas(id: number): string;         // Resolve client name by ID
 *   isLoading: boolean;                      // True if any query is loading
 *   refetchReservations: () => void;         // Refetch latest reservations
 * }
 * ```
 *
 * ## Example:
 * ```tsx
 * const {
 *   barData,
 *   pieData,
 *   laisvi,
 *   latestReservations,
 *   getKlientas,
 *   isLoading,
 * } = useDashboardStats();
 * ```
 */

import { useMemo } from "react";
import {
  useGetAllCarsQuery,
  useGetAllOrdersQuery,
  useGetAllInvoicesQuery,
  useGetAllSupportsQuery,
  useGetAllClientsQuery,
  useGetAllReservationsQuery,
  useGetLatestReservationsQuery,
} from "@/store/carRentalApi";

export function useDashboardStats() {
  /** Fetch latest 5 reservations, excluding cancelled ones */
  const {
    data: latest = [],
    isLoading: loadingLatest,
    refetch: refetchReservations,
  } = useGetLatestReservationsQuery(5);

  const latestReservations = latest.filter(
    (r) => r.busena?.toLowerCase() !== "atšaukta"
  );

  /** Other data queries */
  const { data: automobiliai = [], isLoading: loadingA } = useGetAllCarsQuery();
  const { data: uzsakymai = [], isLoading: loadingU } = useGetAllOrdersQuery();
  const { data: klientai = [], isLoading: loadingK } = useGetAllClientsQuery();
  const { data: saskaitos = [], isLoading: loadingS } =
    useGetAllInvoicesQuery();
  const { data: pagalbosUzklausos = [], isLoading: loadingP } =
    useGetAllSupportsQuery();

  const isLoading =
    loadingLatest || loadingA || loadingU || loadingK || loadingS || loadingP;

  /** Create lookup maps */
  const automobiliaiMap = useMemo(
    () => new Map(automobiliai.map((a) => [a.automobilio_id, a])),
    [automobiliai]
  );

  const klientaiMap = useMemo(
    () => new Map(klientai.map((k) => [k.kliento_id, k])),
    [klientai]
  );

  /** Car statistics */
  const laisvi = automobiliai.filter(
    (a) => a.automobilio_statusas === "laisvas"
  ).length;
  const servise = automobiliai.filter(
    (a) => a.automobilio_statusas === "servise"
  ).length;
  const isnuomoti = automobiliai.filter(
    (a) => a.automobilio_statusas === "isnuomotas"
  ).length;

  /** Other metrics */
  const neapmoketosSaskaitos = saskaitos.filter(
    (s) => s.status === "vėluojanti"
  ).length;
  const neatsakytosUzklausos = pagalbosUzklausos.filter(
    (u) => !u.atsakymas
  ).length;

  /** Today's returns */
  const today = new Date().toISOString().slice(0, 10);
  const siandienGrązinimai = uzsakymai.filter(
    (u) => u.grazinimo_data === today
  ).length;

  /** Bar chart data for order statuses */
  const barData = useMemo(
    () => [
      {
        name: "Vykdomi",
        value: uzsakymai.filter((u) => u.uzsakymo_busena === "vykdomas").length,
      },
      {
        name: "Užbaigti",
        value: uzsakymai.filter((u) => u.uzsakymo_busena === "užbaigta").length,
      },
      {
        name: "Atšaukti",
        value: uzsakymai.filter((u) => u.uzsakymo_busena === "atšaukta").length,
      },
    ],
    [uzsakymai]
  );

  /** Pie chart data for car availability */
  const pieData = [
    { name: "Laisvi", value: laisvi },
    { name: "Servise", value: servise },
    { name: "Išnuomoti", value: isnuomoti },
  ];

  /** Helper to resolve car name from ID */
  const getAutomobilis = (id: number) => {
    const a = automobiliaiMap.get(id);
    return a ? `${a.marke} ${a.modelis}` : `#${id}`;
  };

  /** Helper to resolve client name from ID */
  const getKlientas = (id: number) => {
    const k = klientaiMap.get(id);
    return k ? `${k.vardas} ${k.pavarde}` : `Klientas #${id}`;
  };

  return {
    latestReservations,
    barData,
    pieData,
    laisvi,
    servise,
    neapmoketosSaskaitos,
    neatsakytosUzklausos,
    siandienGrązinimai,
    getAutomobilis,
    getKlientas,
    isLoading,
    refetchReservations,
  };
}
