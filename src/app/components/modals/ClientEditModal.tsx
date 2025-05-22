import { useState } from "react";
import BaseModal from "@/app/components/BaseModal";
import { Klientas } from "@/types";

export default function ClientEditModal({
  client,
  isOpen,
  onClose,
  onSave,
}: {
  client: Klientas;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Klientas) => void;
}) {
  const [form, setForm] = useState(client);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Redaguoti klientą"
      actions={
        <>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Atšaukti
          </button>
          <button
            onClick={() => {
              onSave(form);
              onClose();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Išsaugoti
          </button>
        </>
      }
    >
      <div className="space-y-2">
        <input
          name="vardas"
          value={form.vardas}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="pavarde"
          value={form.pavarde}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="el_pastas"
          value={form.el_pastas}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
    </BaseModal>
  );
}
