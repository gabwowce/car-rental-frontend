import BaseModal from "@/app/components/BaseModal";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Ištrinti klientą?"
      actions={
        <>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Atšaukti
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Ištrinti
          </button>
        </>
      }
    >
      <p className="text-sm">Ar tikrai norite ištrinti šį klientą?</p>
    </BaseModal>
  );
}
