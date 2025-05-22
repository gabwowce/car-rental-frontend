// hooks/useOrdersData.ts
import { useState, useMemo } from "react";
import {
  useGetAllOrdersApiV1OrdersGetQuery,
  useDeleteOrderApiV1OrdersUzsakymoIdDeleteMutation,
  useGetAllClientsApiV1ClientsGetQuery,
  useGetAllCarsApiV1CarsGetQuery,
} from "@/store/carRentalApi";

export function useOrdersData() {
  const { data: orders = [], isLoading: loadingOrders } = useGetAllOrdersApiV1OrdersGetQuery();
  const { data: clients = [], isLoading: loadingClients } = useGetAllClientsApiV1ClientsGetQuery();
  const { data: cars = [], isLoading: loadingCars } = useGetAllCarsApiV1CarsGetQuery();
  const [deleteOrder] = useDeleteOrderApiV1OrdersUzsakymoIdDeleteMutation();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("visi");

  const isLoading = loadingOrders || loadingClients || loadingCars;

  const getClientName = (id: number) =>
    clients.find((c) => c.kliento_id === id)?.vardas || `Klientas #${id}`;

  const getCarName = (id: number) => {
    const car = cars.find((c) => c.automobilio_id === id);
    return car ? `${car.marke} ${car.modelis}` : `Automobilis #${id}`;
  };

  const handleView = (id: number) => {
    console.log("Peržiūrėti", id);
  };

  const handleEdit = (id: number) => {
    console.log("Redaguoti", id);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Ar tikrai norite ištrinti užsakymą?")) {
      try {
        await deleteOrder({ uzsakymoId: id }).unwrap();
        alert("Užsakymas sėkmingai ištrintas");
      } catch (error) {
        console.error("Klaida trinant užsakymą", error);
        alert("Nepavyko ištrinti užsakymo");
      }
    }
  };

  const filtered = useMemo(() => {
    return orders.filter((r) => {
      const klientas = getClientName(r.kliento_id).toLowerCase();
      const automobilis = getCarName(r.automobilio_id).toLowerCase();
      const searchMatch = `${klientas} ${automobilis}`.includes(search.toLowerCase());
      const statusMatch = statusFilter === "visi" || r.busena === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [orders, clients, cars, search, statusFilter]);

  return {
    orders,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    getClientName,
    getCarName,
    handleView,
    handleEdit,
    handleDelete,
    filtered,
    isLoading,
  };
}
