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

/**
 * Custom hook for managing order data in the AutoRent system.
 *
 * Loads all orders, clients, and cars, and provides utilities for:
 * filtering, displaying, editing, deleting, and configuring modal fields.
 */
export function useOrdersData() {
  // === Fetch all orders ===
  const {
    data: orders = [],
    isLoading: loadingOrders,
    refetch: refetchOrders,
  } = useGetAllOrdersQuery();

  // === Fetch clients and cars for lookup ===
  const { data: clients = [], isLoading: loadingClients } =
    useGetAllClientsQuery();
  const { data: cars = [], isLoading: loadingCars } = useGetAllCarsQuery();

  /**
   * Returns the full name of a client by their ID.
   * @param id - Client ID
   */
  const getClientName = (id: number) =>
    clients.find((c: any) => c.kliento_id === id)
      ? `${clients.find((c: any) => c.kliento_id === id)!.vardas} ${
          clients.find((c: any) => c.kliento_id === id)!.pavarde
        }`
      : `Klientas #${id}`;

  /**
   * Returns the car brand and model by car ID.
   * @param id - Car ID
   */
  const getCarName = (id: number) => {
    const car = cars.find((c: any) => c.automobilio_id === id);
    return car ? `${car.marke} ${car.modelis}` : `Automobilis #${id}`;
  };

  // === Mutations: update + delete ===
  const [updateOrder, { isLoading: updating }] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();

  /**
   * Updates a specific order by ID.
   * @param id - Order ID
   * @param data - Partial order data to update
   */
  const saveOrder = async (id: number, data: Partial<OrderOut>) => {
    await updateOrder({ uzsakymoId: id, orderUpdate: data }).unwrap();
    await refetchOrders();
  };

  /**
   * Deletes a specific order by ID.
   * @param id - Order ID
   */
  const handleDelete = async (id: number) => {
    await deleteOrder({ uzsakymoId: id }).unwrap();
    await refetchOrders();
  };

  // === Filter states ===
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("visi");

  /**
   * Filtered list of orders based on search + status.
   */
  const filtered = useMemo(() => {
    return orders.filter((o: any) => {
      const target =
        `${getClientName(o.kliento_id)} ${getCarName(o.automobilio_id)}`.toLowerCase();
      const matchSearch = target.includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "visi" || o.uzsakymo_busena === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, clients, cars, search, statusFilter]);

  /**
   * Field configuration for rendering the order in a form modal.
   */
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
    // Filtered results for table/UI
    filtered,

    // Loading state across all data operations
    isLoading:
      loadingOrders || loadingClients || loadingCars || updating || deleting,

    // Filtering
    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    // Name helpers
    getClientName,
    getCarName,

    // Update + delete logic
    saveOrder,
    handleDelete,

    // Modal field definitions
    orderFields,

    // Refetch orders externally
    refetchOrders,
  };
}
