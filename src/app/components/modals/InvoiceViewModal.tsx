import BaseModal from "@/app/components/ui/BaseModal";
import { Saskaita } from "@/types";

export default function InvoiceViewModal({
  invoice,
  isOpen,
  onClose,
}: {
  invoice: Saskaita;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Sąskaitos informacija">
      <div className="text-sm space-y-2">
        <p><strong>Nr:</strong> {invoice.saskaitos_nr}</p>
        <p><strong>Klientas:</strong> {invoice.klientas}</p>
        <p><strong>Suma:</strong> {invoice.suma} €</p>
        <p><strong>Data:</strong> {invoice.saskaitos_data}</p>
        <p><strong>Būsena:</strong> {invoice.busena}</p>
      </div>
    </BaseModal>
  );
}
