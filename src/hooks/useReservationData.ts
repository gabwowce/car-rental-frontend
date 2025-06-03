// hooks/useReservationData.ts
import {
  useGetAllReservationsQuery,
  useUpdateReservationMutation,
  useDeleteReservationMutation,
} from "@/store/carRentalApi";

import { useClientsData } from "./useClientsData";
import { useCarsData } from "./useCarsData";
import { useState, useMemo } from "react";

export const useReservationData = () => {
  /* ----- API sąrašas ----- */
  const {
    data: reservations = [],
    isLoading,
    refetch,
  } = useGetAllReservationsQuery();

  /* ----- lookup’ai ----- */
  const { clients } = useClientsData();
  const { automobiliai } = useCarsData();

  const clientMap = useMemo(
    () =>
      new Map(
        clients.map((c: any) => [c.kliento_id, `${c.vardas} ${c.pavarde}`])
      ),
    [clients]
  );
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

  const getClientName = (id: number) => clientMap.get(id) ?? `#${id}`;
  const getCarName = (id: number) => carMap.get(id) ?? `#${id}`;

  /* ----- mutation’ai ----- */
  const [updateReservation, { isLoading: updating }] =
    useUpdateReservationMutation();
  const [deleteReservation, { isLoading: deleting }] =
    useDeleteReservationMutation();

  /** Atnaujinti rezervaciją */
  const saveReservation = async (
    rezervacijos_id: number,
    data: {
      rezervacijos_pradzia?: string;
      rezervacijos_pabaiga?: string;
      busena?: string;
    }
  ) => {
    await updateReservation({
      rezervacijosId: rezervacijos_id, // <-- sugeneruoto hook’o param.
      reservationUpdate: data,
    }).unwrap();
    await refetch();
  };

  /** Ištrinti rezervaciją */
  const handleDelete = async (rezervacijos_id: number) => {
    await deleteReservation({ rezervacijosId: rezervacijos_id }).unwrap();
    await refetch();
  };

  /* ----- lokali filtravimo būsena ----- */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "visi" | "patvirtinta" | "laukiama" | "atšaukta"
  >("visi");

  const filtered = reservations.filter((r: any) => {
    const target = `${getClientName(r.kliento_id)} ${getCarName(
      r.automobilio_id
    )}`.toLowerCase();
    const matchSearch = target.includes(search.toLowerCase());

    const busena = (r.busena ?? "").toLowerCase();
    const matchStatus = statusFilter === "visi" || statusFilter === busena;

    return matchSearch && matchStatus;
  });

  /* ----- laukų konfigas modalui ----- */
  const reservationFields = [
    { name: "rezervacijos_pradzia", label: "Pradžia", type: "text" },
    { name: "rezervacijos_pabaiga", label: "Pabaiga", type: "text" },
    {
      name: "busena",
      label: "Būsena",
      type: "select",
      options: [
        { value: "patvirtinta", label: "Patvirtinta" },
        { value: "laukiama", label: "Laukiama" },
        { value: "atšaukta", label: "Atšaukta" },
      ],
    },
  ];

  return {
    /* duomenys */
    reservations,
    filtered,
    isLoading: isLoading || updating || deleting,

    /* paieška / filtras */
    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    /* helpers */
    getClientName,
    getCarName,

    /* CRUD */
    saveReservation,
    handleDelete,

    /* modal fields */
    reservationFields,
  };
};
