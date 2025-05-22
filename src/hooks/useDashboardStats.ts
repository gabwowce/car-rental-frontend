import { useMemo } from "react";
import {
  useGetAllCarsQuery,
  useGetAllOrdersQuery,
  useGetAllReservationsQuery,
  useGetAllInvoicesQuery,
  useGetAllSupportsQuery,
  useGetAllClientsQuery,
} from "../store/carRentalApi";

export function useDashboardStats() {
  const { data: automobiliai = [], isLoading: loadingA } = useGetAllCarsQuery();
  const { data: uzsakymai = [], isLoading: loadingU } = useGetAllOrdersQuery();
  const { data: rezervacijos = [], isLoading: loadingR } =
    useGetAllReservationsQuery();
  const { data: klientai = [], isLoading: loadingK } = useGetAllClientsQuery();
  const { data: saskaitos = [], isLoading: loadingS } =
    useGetAllInvoicesQuery();
  const { data: pagalbosUzklausos = [], isLoading: loadingP } =
    useGetAllSupportsQuery();

  const isLoading =
    loadingA || loadingU || loadingR || loadingK || loadingS || loadingP;
  // Greitesnis lookup per Map
  const automobiliaiMap = useMemo(
    () => new Map(automobiliai.map((a) => [a.automobilio_id, a])),
    [automobiliai]
  );
  const klientaiMap = useMemo(
    () => new Map(klientai.map((k) => [k.kliento_id, k])),
    [klientai]
  );

  // Statistika
  const laisvi = automobiliai.filter(
    (a) => a.automobilio_statusas === "laisvas"
  ).length;
  const servise = automobiliai.filter(
    (a) => a.automobilio_statusas === "servise"
  ).length;
  const isnuomoti = automobiliai.filter(
    (a) => a.automobilio_statusas === "isnuomotas"
  ).length;
  const neapmoketosSaskaitos = saskaitos.filter(
    (s) => s.status === "vėluojanti"
  ).length;
  const neatsakytosUzklausos = pagalbosUzklausos.filter(
    (u) => !u.atsakymas
  ).length;

  const today = new Date().toISOString().slice(0, 10);
  const siandienGrązinimai = uzsakymai.filter(
    (u) => u.grazinimo_data === today
  ).length;

  const barData = useMemo(
    () => [
      {
        name: "Patvirtinti",
        value: uzsakymai.filter((u) => u.uzsakymo_busena === "patvirtinta")
          .length,
      },
      {
        name: "Vykdomi",
        value: uzsakymai.filter((u) => u.uzsakymo_busena === "vykdoma").length,
      },
      {
        name: "Laukiami",
        value: uzsakymai.filter((u) => u.uzsakymo_busena === "laukiama").length,
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

  const pieData = [
    { name: "Laisvi", value: laisvi },
    { name: "Servise", value: servise },
    { name: "Išnuomoti", value: isnuomoti },
  ];

  // Paprasti getteriai pagal ID
  const getAutomobilis = (id: number) => {
    const a = automobiliaiMap.get(id);
    return a ? `${a.marke} ${a.modelis}` : `#${id}`;
  };

  const getKlientas = (id: number) => {
    const k = klientaiMap.get(id);
    return k ? `${k.vardas} ${k.pavarde}` : `Klientas #${id}`;
  };

  return {
    rezervacijos,
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
  };
}
