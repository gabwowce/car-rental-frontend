import {
  useGetAllReservationsQuery,
  useCreateReservationMutation,
  useUpdateReservationMutation,
  useDeleteReservationMutation,
  ReservationCreate,
  ReservationUpdate,
  useGetAllCarsQuery,
} from "@/store/carRentalApi";

import { useClientsData } from "./useClientsData";
import { useCarsData } from "./useCarsData";
import { useState, useMemo } from "react";

/**
 * Custom hook to manage reservation data in the AutoRent system.
 *
 * Provides full CRUD functionality, search and status filtering, and
 * dynamic field definitions for reservation forms/modals.
 */
export const useReservationData = () => {
  // === RTK Query mutation hooks ===
  const [createReservation, { isLoading: creating }] =
    useCreateReservationMutation();
  const [updateReservation, { isLoading: updating }] =
    useUpdateReservationMutation();
  const [deleteReservation, { isLoading: deleting }] =
    useDeleteReservationMutation();

  // === Fetch all reservations ===
  const {
    data: reservations = [],
    isLoading,
    refetch,
  } = useGetAllReservationsQuery();

  // === Fetch clients and cars for lookup ===
  const { clients } = useClientsData();
  const { automobiliai } = useCarsData();

  /**
   * Maps client IDs to their full names.
   */
  const clientMap = useMemo(
    () =>
      new Map(
        clients.map((c: any) => [c.kliento_id, `${c.vardas} ${c.pavarde}`])
      ),
    [clients]
  );

  /**
   * Maps car IDs to their brand + model.
   */
  const carMap = useMemo(
    () =>
      new Map(
        automobiliai.map((a: any) => [
          a.automobilio_id,
          `${a.marke} ${a.modelis}`,
        ])
      ),
    [automobiliai]
  );

  /**
   * Resolve client full name by ID.
   * @param id - Client ID
   */
  const getClientName = (id: number) => clientMap.get(id) ?? `#${id}`;

  /**
   * Resolve car brand + model by ID.
   * @param id - Car ID
   */
  const getCarName = (id: number) => carMap.get(id) ?? `#${id}`;

  /**
   * Create a new reservation or update existing one.
   * @param id - Reservation ID (null for create)
   * @param data - Form data
   */
  const saveReservation = async (
    id: number | null,
    data: ReservationCreate | ReservationUpdate
  ) => {
    if (id === null) {
      await createReservation({ reservationCreate: data }).unwrap();
    } else {
      await updateReservation({
        rezervacijosId: id,
        reservationUpdate: data,
      }).unwrap();
    }
    await refetch();
  };

  /**
   * Delete a reservation by ID.
   * @param rezervacijos_id - Reservation ID
   */
  const handleDelete = async (rezervacijos_id: number) => {
    await deleteReservation({ rezervacijosId: rezervacijos_id }).unwrap();
    await refetch();
  };

  // === Filtering logic ===
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "visi" | "patvirtinta" | "laukiama" | "atšaukta"
  >("visi");

  /**
   * Filtered list based on search and status.
   */
  const filtered = reservations.filter((r: any) => {
    const target =
      `${getClientName(r.kliento_id)} ${getCarName(r.automobilio_id)}`.toLowerCase();
    const matchSearch = target.includes(search.toLowerCase());

    const busena = (r.busena ?? "").toLowerCase();
    const matchStatus = statusFilter === "visi" || statusFilter === busena;

    return matchSearch && matchStatus;
  });

  const { data: cars = [], isLoading: loadingCars } = useGetAllCarsQuery();

  /**
   * Reservation modal field configuration.
   */
  const reservationFields = [
    {
      name: "kliento_id",
      label: "Klientas",
      type: "select",
      required: true,
      options: clients.map((c: any) => ({
        value: c.kliento_id,
        label: `${c.vardas} ${c.pavarde}`,
      })),
    },
    {
      name: "automobilio_id",
      label: "Automobilis",
      type: "select", // ← vietoj "autocomplete"
      required: true,
      options: cars.map((c: any) => ({
        value: c.automobilio_id, // ← VALUE = ID (skaičius)
        label: `${c.marke} ${c.modelis}`,
      })),
    },
    {
      name: "rezervacijos_pradzia",
      label: "Pradžia",
      type: "date",
      required: true,
    },
    {
      name: "rezervacijos_pabaiga",
      label: "Pabaiga",
      type: "date",
      required: true,
    },
    {
      name: "busena",
      label: "Būsena",
      type: "select",
      options: [
        { value: "patvirtinta", label: "Patvirtinta" },
        { value: "laukiama", label: "Laukiama" },
      ],
      required: true,
    },
  ];

  return {
    reservations, // Full reservation list
    filtered, // Filtered reservation list
    isLoading: isLoading || creating || updating || deleting, // Combined loading state
    search, // Search value
    setSearch, // Update search value
    statusFilter, // Status filter
    setStatusFilter, // Update status filter
    getClientName, // Resolve client name
    getCarName, // Resolve car name
    saveReservation, // Create/update action
    handleDelete, // Delete action
    reservationFields, // Modal form fields
  };
};
