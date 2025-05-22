import {
  useGetAllReservationsQuery,
  useDeleteReservationMutation,
  useGetAllClientsQuery,
  useGetAllCarsQuery,
} from "@/store/carRentalApi";
import { useState } from "react";

export function useReservationData() {
  const { data: reservations = [], isLoading: loadingR } =
    useGetAllReservationsQuery();
  const { data: clients = [], isLoading: loadingCl } = useGetAllClientsQuery();
  const { data: cars = [], isLoading: loadingC } = useGetAllCarsQuery();
  const [deleteReservation] = useDeleteReservationMutation();

  const isLoading = loadingCl || loadingR || loadingC;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("visi");

  const getClientName = (id: number) =>
    clients.find((c) => c.kliento_id === id)?.vardas || `Klientas #${id}`;

  const getCarName = (id: number) => {
    const car = cars.find((c) => c.automobilio_id === id);
    return car ? `${car.marke} ${car.modelis}` : `Automobilis #${id}`;
  };

  const handleView = (id: number) => {
    console.log("Peržiūrėti", id);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Ar tikrai norite atšaukti rezervaciją?")) {
      try {
        await deleteReservation({ rezervacijosId: id }).unwrap();
        alert("Rezervacija atšaukta sėkmingai");
      } catch (error) {
        console.error("Klaida trinant rezervaciją", error);
        alert("Nepavyko atšaukti rezervacijos");
      }
    }
  };

  const filtered = reservations.filter((r) => {
    const klientas = getClientName(r.kliento_id).toLowerCase();
    const automobilis = getCarName(r.automobilio_id).toLowerCase();
    const searchMatch = `${klientas} ${automobilis}`.includes(
      search.toLowerCase()
    );
    const statusMatch = statusFilter === "visi" || r.busena === statusFilter;
    return searchMatch && statusMatch;
  });

  return {
    reservations,
    clients,
    cars,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    getClientName,
    getCarName,
    handleView,
    handleDelete,
    filtered,
    isLoading,
  };
}
