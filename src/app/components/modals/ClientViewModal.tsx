import BaseModal from "@/app/components/ui/BaseModal";
import { Klientas } from "@/types";

export default function ClientViewModal({
  client,
  isOpen,
  onClose,
}: {
  client: Klientas;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Kliento informacija">
      <div className="space-y-2 text-sm">
        <p><strong>Vardas:</strong> {client.vardas} {client.pavarde}</p>
        <p><strong>El. paštas:</strong> {client.el_pastas}</p>
        <p><strong>Tel. nr.:</strong> {client.telefono_nr}</p>
        <p><strong>Registracija:</strong> {client.registracijos_data}</p>
        <p><strong>Bonus taškai:</strong> {client.bonus_taskai}</p>
      </div>
    </BaseModal>
  );
}
