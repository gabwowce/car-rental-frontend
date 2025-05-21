"use client";

import { useState } from "react";
import {
  useGetAllReservationsApiV1ReservationsGetQuery,
  useDeleteReservationApiV1ReservationsRezervacijosIdDeleteMutation,
  useGetAllClientsApiV1ClientsGetQuery,
  useGetAllCarsApiV1CarsGetQuery,
} from "@/store/carRentalApi";
import DataTable from "@/app/components/DataTable";
import ActionButtons from "@/app/components/ActionButtons";

type Rezervacija = {
  rezervacijos_id: number;
  kliento_id: number;
  automobilio_id: number;
  rezervacijos_pradzia: string;
  rezervacijos_pabaiga: string;
  busena: string;
};

export default function ReservationsPage() {
  const { data: reservations = [], isLoading } =
    useGetAllReservationsApiV1ReservationsGetQuery();
  const { data: clients = [] } = useGetAllClientsApiV1ClientsGetQuery();
  const { data: cars = [] } = useGetAllCarsApiV1CarsGetQuery();
  const [deleteReservation] =
    useDeleteReservationApiV1ReservationsRezervacijosIdDeleteMutation();

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

  const columns = [
    {
      label: "Klientas",
      accessor: (r: Rezervacija) => getClientName(r.kliento_id),
    },
    {
      label: "Automobilis",
      accessor: (r: Rezervacija) => getCarName(r.automobilio_id),
    },
    { label: "Pradžia", accessor: "rezervacijos_pradzia" },
    { label: "Pabaiga", accessor: "rezervacijos_pabaiga" },
    {
      label: "Būsena",
      accessor: (r: Rezervacija) => {
        const status = r.busena.toLowerCase();
        const colorMap: Record<string, string> = {
          aktyvi: "bg-green-100 text-green-800",
          patvirtinta: "bg-green-100 text-green-800",
          atšaukta: "bg-red-100 text-red-800",
          laukia: "bg-yellow-100 text-yellow-800",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${colorMap[status] || ""}`}
          >
            {r.busena}
          </span>
        );
      },
    },
    {
      label: "Veiksmai",
      accessor: (r: Rezervacija) => (
        <ActionButtons
          onView={() => handleView(r.rezervacijos_id)}
          onDelete={() => handleDelete(r.rezervacijos_id)}
          show={{ view: true, edit: false, delete: true }}
        />
      ),
    },
  ];

  const filtered = reservations.filter((r) => {
    const klientas = getClientName(r.kliento_id).toLowerCase();
    const automobilis = getCarName(r.automobilio_id).toLowerCase();
    const searchMatch = `${klientas} ${automobilis}`.includes(
      search.toLowerCase()
    );
    const statusMatch = statusFilter === "visi" || r.busena === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rezervacijos</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nauja rezervacija
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ieškoti pagal klientą ar automobilį"
          className="border p-2 rounded w-64"
        />
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="visi">Visos</option>
          <option value="patvirtinta">Patvirtintos</option>
          <option value="laukiama">Laukiančios</option>
          <option value="atšaukta">Atšauktos</option>
        </select>
      </div>

      {isLoading ? (
        <p>Įkeliama...</p>
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(r) => r.rezervacijos_id}
        />
      )}
    </div>
  );
}
