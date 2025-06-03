// hooks/useOrdersData.ts
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
    if (!confirm(`Ar tikrai norite ištrinti užsakymą #${id}?`)) return;
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
    { name: "nuomos_data", label: "Nuomos data", type: "text" },
    { name: "grazinimo_data", label: "Grąžinimo data", type: "text" },
    {
      name: "uzsakymo_busena",
      label: "Būsena",
      type: "select",
      options: [
        { value: "vykdomas", label: "Vykdomas" },
        { value: "užbaigtas", label: "Užbaigtas" },
        { value: "atšauktas", label: "Atšauktas" },
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
