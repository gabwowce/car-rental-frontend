"use client";

import { useState } from "react";
import { PagalbosUzklausos } from "@/fakeData";
import DataTable from "@/app/components/DataTable";
import ActionButtons from "@/app/components/ActionButtons";
import EntityModal from "@/app/components/modals/EntityModal";
import ConfirmDeleteModal from "@/app/components/modals/ConfirmDeleteModal";
import { FieldConfig } from "@/app/components/modals/EntityModal";

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("visi");
  const [selected, setSelected] = useState<any | null>(null);
  const [mode, setMode] = useState<"edit" | "delete" | null>(null);

  const filtered = PagalbosUzklausos.filter((u) => {
    const matchSearch = `${u.klientas} ${u.tema}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "visi" ||
      (statusFilter === "neatsakyta" && !u.atsakymas) ||
      (statusFilter === "atsakyta" && !!u.atsakymas);
    return matchSearch && matchStatus;
  });

  const supportFields: FieldConfig<any>[] = [
    { name: "klientas", label: "Klientas", type: "text" },
    { name: "tema", label: "Tema", type: "text" },
    {
      name: "pateikimo_data",
      label: "Pateikta",
      type: "text",
      format: (v) => new Date(v).toLocaleString("lt-LT"),
    },
    { name: "pranesimas", label: "Pranešimas", type: "textarea" },
    { name: "atsakymas", label: "Atsakymas", type: "textarea" },
    {
      name: "atsakymo_data",
      label: "Atsakyta",
      type: "text",
      format: (v) => (v ? new Date(v).toLocaleString("lt-LT") : "—"),
    },
  ];

  const columns = [
    { label: "Klientas", accessor: "klientas" },
    { label: "Tema", accessor: "tema" },
    {
      label: "Pateikta",
      accessor: (u: any) => new Date(u.pateikimo_data).toLocaleString("lt-LT"),
    },
    { label: "Pranešimas", accessor: "pranesimas" },
    { label: "Atsakymas", accessor: "atsakymas" },
    {
      label: "Atsakyta",
      accessor: (u: any) =>
        u.atsakymas ? new Date(u.atsakymo_data).toLocaleString("lt-LT") : "—",
    },
    {
      label: "Veiksmai",
      accessor: (u: any) => (
        <ActionButtons
          onEdit={() => {
            setSelected(u);
            setMode("edit");
          }}
          onDelete={() => {
            setSelected(u);
            setMode("delete");
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pagalbos užklausos</h1>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Ieškoti pagal klientą ar temą"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="visi">Visos</option>
          <option value="neatsakyta">Neatsakytos</option>
          <option value="atsakyta">Atsakytos</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(u) => u.uzklausos_id}
      />

      {selected && mode === "edit" && (
        <EntityModal
          title={`Atsakyti klientui: ${selected.klientas}`}
          entity={selected}
          fields={supportFields}
          isOpen={true}
          onClose={() => {
            setSelected(null);
            setMode(null);
          }}
          onSave={(updated) => {
            console.log("Atsakyta į užklausą:", updated);
            setSelected(null);
            setMode(null);
          }}
          startInEdit={false}
        />
      )}

      {selected && mode === "delete" && (
        <ConfirmDeleteModal
          isOpen={true}
          onClose={() => {
            setSelected(null);
            setMode(null);
          }}
          onConfirm={() => {
            console.log("Ištrinta užklausa:", selected.uzklausos_id);
            setSelected(null);
            setMode(null);
          }}
          entityName="užklausą"
        />
      )}
    </div>
  );
}
