// useReservationData.ts -----------------------------------------------------
import {
  useGetAllReservationsQuery,
  useDeleteReservationMutation,
  useGetAllClientsQuery,
  useGetAllCarsQuery,
} from "@/store/carRentalApi";
import { useState } from "react";
import { FieldConfig } from "@/app/components/modals/EntityModal";

/* 1️⃣  Apibrėžiame tipą, kad TypeScript žinotų laukus.
      Pritaikyk pagal realų API objektą, jei trūksta laukų. */
export interface Rezervacija {
  rezervacijos_id: number;
  kliento_id: number;
  automobilio_id: number;
  rezervacijos_pradzia: string; // arba Date, jei konvertuoji
  rezervacijos_pabaiga: string;
  busena: string;
}

export function useReservationData() {
  // --- API užklausos -------------------------------------------------------
  const { data: reservations = [], isLoading: loadingR } =
    useGetAllReservationsQuery();
  const { data: clients = [], isLoading: loadingCl } = useGetAllClientsQuery();
  const { data: cars = [], isLoading: loadingC } = useGetAllCarsQuery();
  const [deleteReservation] = useDeleteReservationMutation();

  const isLoading = loadingCl || loadingR || loadingC;

  // --- paieška / filtrai ---------------------------------------------------
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("visi");

  // --- helper-funkcijos ----------------------------------------------------
  const getClientName = (id: number) =>
    clients.find((c) => c.kliento_id === id)?.vardas || `Klientas #${id}`;

  const getCarName = (id: number) => {
    const car = cars.find((c) => c.automobilio_id === id);
    return car ? `${car.marke} ${car.modelis}` : `Automobilis #${id}`;
  };

  // --- laukų aprašas EntityModal’ui (reikėjo po helperių!) ----------------
  const reservationFields: FieldConfig<Rezervacija>[] = [
    { name: "kliento_id", label: "Klientas", type: "text" },
    { name: "automobilio_id", label: "Automobilis", type: "text" },
    { name: "rezervacijos_pradzia", label: "Pradžia", type: "text" },
    { name: "rezervacijos_pabaiga", label: "Pabaiga", type: "text" },
    {
      name: "busena",
      label: "Būsena",
      type: "select",
      options: [
        { value: "aktyvi", label: "Aktyvi" },
        { value: "patvirtinta", label: "Patvirtinta" },
        { value: "laukiama", label: "Laukiama" },
        { value: "atšaukta", label: "Atšaukta" },
      ],
    },
  ];

  // --- delete --------------------------------------------------------------
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

  // --- filtravimas ---------------------------------------------------------
  const filtered = reservations.filter((r) => {
    const klientas = getClientName(r.kliento_id).toLowerCase();
    const automobilis = getCarName(r.automobilio_id).toLowerCase();
    const searchMatch = `${klientas} ${automobilis}`.includes(
      search.toLowerCase()
    );
    const statusMatch =
      statusFilter === "visi" || r.busena.toLowerCase() === statusFilter;
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
    handleDelete,
    filtered,
    isLoading,
    reservationFields, // ⬅️ naudosi ReservationsPage + EntityModal
  };
}
