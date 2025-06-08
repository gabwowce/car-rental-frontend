/**
 * useOrdersData
 *
 * Custom React hook for managing order data (`Užsakymai`) in the AutoRent system.
 * Fetches all orders, clients, and cars, and provides utilities for CRUD operations,
 * filtering, and displaying data in modals or tables.
 *
 * ---
 * ## Features:
 * - Loads all orders, clients, and cars via RTK Query
 * - Provides real-time lookup helpers for displaying client and car names
 * - Handles search and filtering by order status
 * - Returns preconfigured field definitions for use in a generic `EntityModal`
 * - Supports updating and deleting orders
 *
 * ---
 * ## Returns:
 * ```ts
 * {
 *   filtered: OrderOut[];                  // Filtered list of orders for UI
 *   isLoading: boolean;                    // Whether any of the queries or mutations are loading
 *   search: string;                        // Current search string
 *   setSearch: (value: string) => void;    // Set search string
 *   statusFilter: string;                  // Current status filter
 *   setStatusFilter: (value: string) => void; // Set status filter
 *   getClientName: (id: number) => string; // Returns full name of client by ID
 *   getCarName: (id: number) => string;    // Returns car make + model by ID
 *   saveOrder: (id: number, data: Partial<OrderOut>) => Promise<void>; // Update order
 *   handleDelete: (id: number) => Promise<void>; // Delete order
 *   orderFields: FieldConfig<OrderOut>[];  // Fields for displaying/editing an order in EntityModal
 *   refetchOrders: () => void;             // Manual refetch if needed externally
 * }
 * ```
 *
 * ---
 * ## Example Usage:
 * ```tsx
 * const {
 *   filtered,
 *   isLoading,
 *   search,
 *   setSearch,
 *   statusFilter,
 *   setStatusFilter,
 *   getClientName,
 *   getCarName,
 *   saveOrder,
 *   handleDelete,
 *   orderFields,
 * } = useOrdersData();
 *
 * return <DataTable columns={...} data={filtered} />;
 * ```
 */
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetAllClientsQuery,
  useGetAllCarsQuery,
} from "@/store/carRentalApi";
import { useState, useMemo } from "react";
import { FieldConfig } from "@/app/components/modals/EntityModal";
import type { OrderOut } from "@/store/carRentalApi";

export function useOrdersData() {
  /* ----- užsakymai + refetch ----- */
  const {
    data: orders = [],
    isLoading: loadingOrders,
    refetch: refetchOrders,
  } = useGetAllOrdersQuery();

  /* ----- lookup’ai klientui / auto ----- */
  const { data: clients = [], isLoading: loadingClients } =
    useGetAllClientsQuery();
  const { data: cars = [], isLoading: loadingCars } = useGetAllCarsQuery();

  const getClientName = (id: number) =>
    clients.find((c: any) => c.kliento_id === id)
      ? `${clients.find((c: any) => c.kliento_id === id)!.vardas} ${
          clients.find((c: any) => c.kliento_id === id)!.pavarde
        }`
      : `Klientas #${id}`;

  const getCarName = (id: number) => {
    const car = cars.find((c: any) => c.automobilio_id === id);
    return car ? `${car.marke} ${car.modelis}` : `Automobilis #${id}`;
  };

  /* ----- mutation’ai ----- */
  const [updateOrder, { isLoading: updating }] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();

  /* ----- CRUD helperiai ----- */
  const saveOrder = async (id: number, data: Partial<OrderOut>) => {
    await updateOrder({
      uzsakymoId: id,
      orderUpdate: data,
    }).unwrap();
    await refetchOrders();
  };

  const handleDelete = async (id: number) => {
    await deleteOrder({ uzsakymoId: id }).unwrap();
    await refetchOrders();
  };

  /* ----- filtravimas ----- */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("visi");

  const filtered = useMemo(() => {
    return orders.filter((o: any) => {
      const target = `${getClientName(o.kliento_id)} ${getCarName(
        o.automobilio_id
      )}`.toLowerCase();
      const matchSearch = target.includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "visi" || o.uzsakymo_busena === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, clients, cars, search, statusFilter]);

  /* ----- laukų konfigas modalui ----- */
  const orderFields: FieldConfig<OrderOut>[] = [
    { name: "kliento_id", label: "Kliento ID", type: "number", required: true },
    {
      name: "automobilio_id",
      label: "Automobilio ID",
      type: "number",
      required: true,
    },
    {
      name: "darbuotojo_id",
      label: "Darbuotojo ID",
      type: "number",
      required: true,
    },
    { name: "nuomos_data", label: "Nuomos data", type: "date", required: true },
    {
      name: "grazinimo_data",
      label: "Grąžinimo data",
      type: "date",
      required: true,
    },
    {
      name: "paemimo_vietos_id",
      label: "Paėmimo vietos ID",
      type: "number",
      required: true,
    },
    {
      name: "grazinimo_vietos_id",
      label: "Grąžinimo vietos ID",
      type: "number",
      required: true,
    },
    {
      name: "bendra_kaina",
      label: "Bendra kaina (€)",
      type: "number",
      required: true,
    },
    {
      name: "uzsakymo_busena",
      label: "Būsena",
      type: "select",
      required: true,
      options: [
        { value: "vykdomas", label: "Vykdomas" },
        { value: "užbaigtas", label: "Užbaigtas" },
        { value: "atšauktas", label: "Atšauktas" },
      ],
    },
    {
      name: "turi_papildomas_paslaugas",
      label: "Papildomos paslaugos?",
      type: "select",
      required: true,
      options: [
        { value: true, label: "Taip" },
        { value: false, label: "Ne" },
      ],
    },
  ];

  return {
    /* duomenys */
    filtered,
    isLoading:
      loadingOrders || loadingClients || loadingCars || updating || deleting,

    /* filtravimas */
    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    /* helpers */
    getClientName,
    getCarName,

    /* CRUD */
    saveOrder,
    handleDelete,

    /* modal fields */
    orderFields,

    /* refetch – jei norėtum kviesti iš išorės */
    refetchOrders,
  };
}
