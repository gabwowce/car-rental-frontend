"use client";

import { useInvoicesData } from "@/hooks/useInvoicesData";
import { useInvoiceModals } from "@/hooks/useInvoiceModals";
import DataTable from "@/app/components/DataTable";
import ActionButtons from "@/app/components/ActionButtons";
import InvoiceViewModal from "@/app/components/modals/InvoiceViewModal";
import ConfirmDeleteModal from "@/app/components/modals/ConfirmDeleteModal";

type Saskaita = NonNullable<
  ReturnType<typeof useInvoicesData>["invoices"]
>[number];

export default function InvoicesPage() {
  const {
    invoices,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filtered,
    isLoading,
  } = useInvoicesData();

  const { selected, mode, openView, openPdf, openDelete, close } =
    useInvoiceModals();

  const columns = [
    { label: "Sąskaitos nr.", accessor: "invoice_id" },
    {
      label: "Klientas",
      accessor: (s: Saskaita) => `${s.client_first_name} ${s.client_last_name}`,
    },
    {
      label: "Suma",
      accessor: (s: Saskaita) => `${s.total} €`,
    },
    {
      label: "Data",
      accessor: (s: Saskaita) =>
        new Date(s.invoice_date).toLocaleDateString("lt-LT"),
    },
    {
      label: "Būsena",
      accessor: (s: Saskaita) => {
        const colorMap: Record<string, string> = {
          išrašyta: "bg-gray-100 text-gray-800",
          apmokėta: "bg-green-100 text-green-800",
          vėluojanti: "bg-red-100 text-red-800",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              colorMap[s.status] || ""
            }`}
          >
            {s.status}
          </span>
        );
      },
    },
    {
      label: "Veiksmai",
      accessor: (s: Saskaita) => (
        <ActionButtons
          onView={() => openView(s)}
          onEdit={() => openPdf(s)}
          show={{ delete: false }}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sąskaitos</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nauja sąskaita
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Ieškoti pagal klientą ar sąskaitos nr."
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
          <option value="išrašyta">Išrašytos</option>
          <option value="apmokėta">Apmokėtos</option>
          <option value="vėluojanti">Vėluojančios</option>
        </select>
      </div>

      {isLoading ? (
        <p>Įkeliama...</p>
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(s) => s.invoice_id}
        />
      )}

      {selected && mode === "view" && (
        <InvoiceViewModal invoice={selected} isOpen={true} onClose={close} />
      )}

      {selected && mode === "pdf" && (
        <ConfirmDeleteModal
          isOpen={true}
          title="Atsisiųsti PDF?"
          onClose={close}
          onConfirm={() => {
            console.log("Atsisiųsti PDF:", selected.invoice_id);
            close();
          }}
        />
      )}
    </div>
  );
}
