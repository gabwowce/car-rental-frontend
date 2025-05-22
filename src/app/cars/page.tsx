"use client";
import { useState } from "react";
import DataTable from "../components/DataTable";
import ActionButtons from "../components/ActionButtons";
import MapComponent from "../components/MapComponent";
import CarViewModal from "../components/modals/CarViewModal";
import BaseModal from "../components/BaseModal";
import { useCarsData } from "@/hooks/useCarsData";
import LoadingScreen from "@/app/components/loadingScreen";

type Automobilis = NonNullable<
  ReturnType<typeof useCarsData>["automobiliai"]
>[number];

export default function CarsPage() {
  const {
    automobiliai,
    isLoading,
    filtered,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    selectedCar,
    setSelectedCar,
    isModalOpen,
    setModalOpen,
  } = useCarsData();

  const [editMode, setEditMode] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const columns = [
    {
      label: "Modelis",
      accessor: (a: Automobilis) => `${a.marke} ${a.modelis}`,
    },
    { label: "Numeris", accessor: "numeris" },
    { label: "Būsena", accessor: "automobilio_statusas" },
    { label: "Vietos", accessor: "sedimos_vietos" },
    {
      label: "Kaina parai",
      accessor: (a: Automobilis) => `${a.kaina_parai} €`,
    },
    {
      label: "Veiksmai",
      accessor: (a: Automobilis) => (
        <ActionButtons
          onView={() => {
            setSelectedCar(a);
            setEditMode(false);
            setModalOpen(true);
          }}
          onEdit={() => {
            setSelectedCar(a);
            setEditMode(true);
            setModalOpen(true);
          }}
          onDelete={() => {
            setSelectedCar(a);
            setDeleteConfirmOpen(true);
          }}
        />
      ),
    },
  ];

  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Automobiliai</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Pridėti naują automobilį
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ieškoti pagal modelį ar numerį"
          className="border p-2 rounded w-64"
        />
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="visi">Visi</option>
          <option value="laisvas">Laisvi</option>
          <option value="isnuomotas">Išnuomoti</option>
          <option value="servise">Servise</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(a) => a.automobilio_id}
        itemsPerPage={5}
      />

      <MapComponent cars={filtered} />

      {/* VIEW/EDIT Modal */}
      {selectedCar && (
        <CarViewModal
          isOpen={isModalOpen}
          car={selectedCar}
          startInEdit={editMode}
          onClose={() => {
            setModalOpen(false);
            setEditMode(false);
          }}
          onSave={(updated) => {
            console.log("Išsaugotas automobilis", updated);
            setModalOpen(false);
            setEditMode(false);
          }}
        />
      )}

      {/* DELETE Modal */}
      {selectedCar && deleteConfirmOpen && (
        <BaseModal
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          title="Ištrinti automobilį?"
          actions={
            <>
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Atšaukti
              </button>
              <button
                onClick={() => {
                  console.log("Ištrinta:", selectedCar.automobilio_id);
                  setDeleteConfirmOpen(false);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Ištrinti
              </button>
            </>
          }
        >
          <p className="text-sm">Ar tikrai norite ištrinti šį automobilį?</p>
        </BaseModal>
      )}
    </div>
  );
}
