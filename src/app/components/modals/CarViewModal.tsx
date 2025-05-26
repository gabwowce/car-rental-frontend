// components/modals/CarViewModal.tsx
import { useState } from "react";
import BaseModal from "@/app/components/BaseModal";
import { Automobilis } from "@/types";

export default function CarViewModal({
  car,
  isOpen,
  onClose,
  onSave,
  startInEdit = false,
}: {
  car: Automobilis;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Automobilis) => void;
  startInEdit?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(startInEdit);
  const [form, setForm] = useState<Automobilis>(car);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(form);
    setIsEditing(false);
  };

  const renderView = () => (
    <div className="space-y-2 text-sm z-50">
      <p>
        <strong>Numeris:</strong> {car.numeris}
      </p>
      <p>
        <strong>Būsena:</strong> {car.automobilio_statusas}
      </p>
      <p>
        <strong>Kaina:</strong> {car.kaina_parai} €
      </p>
      <p>
        <strong>Sėdimos vietos:</strong> {car.sedimos_vietos}
      </p>
    </div>
  );

  const renderEdit = () => (
    <div className="space-y-4 z-50">
      <input
        className="border p-2 rounded w-full"
        name="numeris"
        value={form.numeris}
        onChange={handleChange}
      />
      <input
        className="border p-2 rounded w-full"
        name="kaina_parai"
        value={form.kaina_parai}
        onChange={handleChange}
      />
      <input
        className="border p-2 rounded w-full"
        name="sedimos_vietos"
        value={form.sedimos_vietos}
        onChange={handleChange}
      />
    </div>
  );

  const actions = isEditing ? (
    <>
      <button
        onClick={() => setIsEditing(false)}
        className="bg-gray-300 px-4 py-2 rounded"
      >
        Atšaukti
      </button>
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Išsaugoti
      </button>
    </>
  ) : (
    <button
      onClick={() => setIsEditing(true)}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Redaguoti
    </button>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Automobilis: ${car.marke} ${car.modelis}`}
      actions={actions}
    >
      {isEditing ? renderEdit() : renderView()}
    </BaseModal>
  );
}
