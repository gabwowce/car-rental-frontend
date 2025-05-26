import { useState, useMemo } from "react";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useGetAllClientsQuery,
  useGetAllCarsQuery,
} from "@/store/carRentalApi";
import { FieldConfig } from "@/app/components/modals/EntityModal";
import { OrderOut } from "@/store/carRentalApi";

export function useOrdersData() {
  const { data: orders = [], isLoading: loadingOrders } =
    useGetAllOrdersQuery();
  const { data: clients = [], isLoading: loadingClients } =
    useGetAllClientsQuery();
  const { data: cars = [], isLoading: loadingCars } = useGetAllCarsQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("visi");

  const isLoading = loadingOrders || loadingClients || loadingCars;

  const getClientName = (id: number) =>
    clients.find((c) => c.kliento_id === id)?.vardas || `Klientas #${id}`;

  const getCarName = (id: number) => {
    const car = cars.find((c) => c.automobilio_id === id);
    return car ? `${car.marke} ${car.modelis}` : `Automobilis #${id}`;
  };

  const orderFields: FieldConfig<OrderOut>[] = [
    { name: "uzsakymo_id", label: "ID", type: "text" },
    {
      name: "kliento_id",
      label: "Klientas",
      type: "text",
      format: (_, r) => getClientName(r.kliento_id),
    },
    {
      name: "automobilio_id",
      label: "Automobilis",
      type: "text",
      format: (_, r) => getCarName(r.automobilio_id),
    },
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

  const filtered = useMemo(() => {
    return orders.filter((r) => {
      const klientas = getClientName(r.kliento_id).toLowerCase();
      const automobilis = getCarName(r.automobilio_id).toLowerCase();
      const searchMatch = `${klientas} ${automobilis}`.includes(
        search.toLowerCase()
      );
      const statusMatch =
        statusFilter === "visi" || r.uzsakymo_busena === statusFilter;
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
    handleView: (id: number) => console.log("Peržiūrėti", id),
    handleEdit: (id: number) => console.log("Redaguoti", id),
    handleDelete: async (id: number) => {
      if (confirm("Ar tikrai norite ištrinti užsakymą?")) {
        try {
          await deleteOrder({ uzsakymoId: id }).unwrap();
          alert("Užsakymas sėkmingai ištrintas");
        } catch (error) {
          console.error("Klaida trinant užsakymą", error);
          alert("Nepavyko ištrinti užsakymo");
        }
      }
    },
    filtered,
    isLoading,
    orderFields,
  };
}
