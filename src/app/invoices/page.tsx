"use client";

import { useInvoicesData } from "@/hooks/useInvoicesData";
import { useInvoiceModals } from "@/hooks/useInvoiceModals";
import DataTable from "@/app/components/DataTable";
import ActionButtons from "@/app/components/ActionButtons";
import InvoiceViewModal from "@/app/components/modals/InvoiceViewModal";
import StatusBadge from "@/app/components/StatusBadge";

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

  const handlePdfDownload = () => {
    if (selected) {
      const confirmed = window.confirm(
        `Ar tikrai norite atsisiųsti PDF sąskaitai nr. ${selected.invoice_id}?`
      );
      if (confirmed) {
        console.log("Atsisiųsti PDF:", selected.invoice_id);
        // Čia galima įdėti tikrą failo atsisiuntimo logiką
      }
      close();
    }
  };

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
      accessor: (s: Saskaita) => <StatusBadge status={s.status} />,
    },
    {
      label: "Veiksmai",
      accessor: (s: Saskaita) => (
        <ActionButtons
          onExtra={() =>
            window.open(
              `mailto:buhaltere@autorent.lt?subject=Sąskaita%20nr.%20${s.invoice_id}&body=Gerbiama buhaltere,%0A%0APrašome peržiūrėti sąskaitą nr. ${s.invoice_id}.`,
              "_blank"
            )
          }
          show={{ delete: false, extra: true }}
          extraLabel="Rašyti buhalterei"
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sąskaitos</h1>
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
          rowClassName={(s) => {
            const base = "transition";
            const map: Record<string, string> = {
              patvirtinta: "bg-blue-50",
              užbaigta: "bg-yellow-50",
              apmokėta: "bg-green-50",
              vėluojanti: "bg-red-50",
            };
            return `${base} ${map[s.status] || ""}`;
          }}
        />
      )}

      {selected && mode === "view" && (
        <InvoiceViewModal invoice={selected} isOpen={true} onClose={close} />
      )}

      {selected &&
        mode === "pdf" &&
        (() => {
          handlePdfDownload();
          return null;
        })()}
    </div>
  );
}
