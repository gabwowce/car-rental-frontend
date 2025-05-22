import BaseModal from "@/app/components/ui/BaseModal";
import { Uzsakymas } from "@/types";

export default function OrderViewModal({
  order,
  isOpen,
  onClose,
}: {
  order: Uzsakymas;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Užsakymo informacija">
      <div className="space-y-2 text-sm">
        <p><strong>Klientas ID:</strong> {order.kliento_id}</p>
        <p><strong>Automobilis ID:</strong> {order.automobilio_id}</p>
        <p><strong>Pradžia:</strong> {order.pradzia}</p>
        <p><strong>Pabaiga:</strong> {order.pabaiga}</p>
        <p><strong>Būsena:</strong> {order.busena}</p>
      </div>
    </BaseModal>
  );
}
