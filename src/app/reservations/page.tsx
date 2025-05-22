"use client";


import DataTable from "@/app/components/DataTable";
import ActionButtons from "@/app/components/ActionButtons";
import { useReservationData } from "@/hooks/useReservationData";
import LoadingScreen from "@/app/components/LoadingScreen";



type Rezervacija = NonNullable<
  ReturnType<typeof useReservationData>["reservations"]
>[number];

export default function ReservationsPage() {

const {
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
} = useReservationData();

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

   if (isLoading) {
      return <LoadingScreen/>
    }

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
