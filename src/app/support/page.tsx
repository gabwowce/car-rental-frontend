"use client";

import { useState } from "react";
import DataTable from "@/app/components/DataTable";
import { useSupportData } from "@/hooks/useSupportData";

export default function SupportPage() {
  const { supports, isLoading, answer } = useSupportData();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "visi" | "neatsakyta" | "atsakyta"
  >("visi");

  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [sendingId, setSendingId] = useState<number | null>(null);

  const filtered = supports.filter((u) => {
    const matchSearch = `${u.klientas} ${u.tema}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "visi" ||
      (statusFilter === "neatsakyta" && !u.atsakymas) ||
      (statusFilter === "atsakyta" && !!u.atsakymas);
    return matchSearch && matchStatus;
  });

  const columns = [
    { label: "Klientas", accessor: "klientas" },
    { label: "Tema", accessor: "tema" },
    {
      label: "Pateikta",
      accessor: (u: any) => new Date(u.pateikimo_data).toLocaleString("lt-LT"),
    },
    { label: "Pranešimas", accessor: "pranesimas" },
    {
      label: "Atsakymas",
      accessor: (u: any) => {
        if (u.atsakymas) return u.atsakymas;

        if (activeReplyId !== u.uzklausos_id) {
          return (
            <button
              onClick={() => setActiveReplyId(u.uzklausos_id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
            >
              Atsakyti
            </button>
          );
        }

        return (
          <div className="flex flex-col gap-2">
            <textarea
              placeholder="Įveskite atsakymą..."
              value={responses[u.uzklausos_id] || ""}
              onChange={(e) =>
                setResponses((prev) => ({
                  ...prev,
                  [u.uzklausos_id]: e.target.value,
                }))
              }
              className="border rounded p-2 w-full"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  const text = responses[u.uzklausos_id]?.trim();
                  if (!text) return;
                  setSendingId(u.uzklausos_id);
                  await answer(u.uzklausos_id, text);
                  setResponses((prev) => ({ ...prev, [u.uzklausos_id]: "" }));
                  setActiveReplyId(null);
                  setSendingId(null);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm"
                disabled={sendingId === u.uzklausos_id}
              >
                {sendingId === u.uzklausos_id ? "Siunčiama..." : "Siųsti"}
              </button>
              <button
                onClick={() => {
                  setActiveReplyId(null);
                  setResponses((prev) => ({ ...prev, [u.uzklausos_id]: "" }));
                }}
                className="text-sm text-gray-500 hover:underline"
              >
                Atšaukti
              </button>
            </div>
          </div>
        );
      },
    },
    {
      label: "Atsakyta",
      accessor: (u: any) =>
        u.atsakymo_data
          ? new Date(u.atsakymo_data).toLocaleString("lt-LT")
          : "—",
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
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="border p-2 rounded"
        >
          <option value="visi">Visos</option>
          <option value="neatsakyta">Neatsakytos</option>
          <option value="atsakyta">Atsakytos</option>
        </select>
      </div>

      {isLoading ? (
        <p>Kraunama...</p>
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(u) => u.uzklausos_id}
        />
      )}
    </div>
  );
}
