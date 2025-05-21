"use client";

import { useState } from "react";
import {
  useGetAllOrdersApiV1OrdersGetQuery,
  useDeleteOrderApiV1OrdersUzsakymoIdDeleteMutation,
  useGetAllClientsApiV1ClientsGetQuery,
  useGetAllCarsApiV1CarsGetQuery,
} from "@/store/carRentalApi";
import DataTable from "@/app/components/DataTable";
import ActionButtons from "@/app/components/ActionButtons";

type Uzsakymas = {
  uzsakymo_id: number;
  kliento_id: number;
  automobilio_id: number;
  pradzia: string;
  pabaiga: string;
  busena: string;
};

export default function OrdersPage() {
  const { data: orders = [], isLoading } = useGetAllOrdersApiV1OrdersGetQuery();
  const { data: clients = [] } = useGetAllClientsApiV1ClientsGetQuery();
  const { data: cars = [] } = useGetAllCarsApiV1CarsGetQuery();
  const [deleteOrder] = useDeleteOrderApiV1OrdersUzsakymoIdDeleteMutation();

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

  const columns = [
    {
      label: "Klientas",
      accessor: (r: Uzsakymas) => getClientName(r.kliento_id),
    },
    {
      label: "Automobilis",
      accessor: (r: Uzsakymas) => getCarName(r.automobilio_id),
    },
    { label: "Pradžia", accessor: "pradzia" },
    { label: "Pabaiga", accessor: "pabaiga" },
    {
      label: "Būsena",
      accessor: (r: Uzsakymas) => {
        const colorMap: Record<string, string> = {
          vykdomas: "bg-blue-100 text-blue-800",
          užbaigtas: "bg-green-100 text-green-800",
          atšauktas: "bg-red-100 text-red-800",
        };
        const status = (r.busena ?? "").toLowerCase();

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
      accessor: (r: Uzsakymas) => (
        <ActionButtons
          onView={() => handleView(r.uzsakymo_id)}
          onEdit={() => handleEdit(r.uzsakymo_id)}
          onDelete={() => handleDelete(r.uzsakymo_id)}
        />
      ),
    },
  ];

  const filtered = orders.filter((r) => {
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
        <h1 className="text-2xl font-bold">Užsakymai</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Naujas užsakymas
        </button>
      </div>

      {/* Filtrai */}
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
          <option value="visi">Visi</option>
          <option value="vykdomas">Vykdomi</option>
          <option value="užbaigtas">Užbaigti</option>
          <option value="atšauktas">Atšaukti</option>
        </select>
      </div>

      {isLoading ? (
        <p>Įkeliama...</p>
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(r) => r.uzsakymo_id}
        />
      )}
    </div>
  );
}
