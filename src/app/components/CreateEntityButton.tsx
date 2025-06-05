// src/app/components/CreateEntityButton.tsx
"use client";

import { useState } from "react";
import EntityModal from "./modals/EntityModal";

export type FieldConfig<T extends Record<string, any>> = {
  name: keyof T & string;
  label: string;
  type?: "text" | "number" | "select" | "textarea";
  options?: { value: any; label: string }[];
  format?: (value: any, entity: T) => string;
};

/**
 * Universalus mygtukas, kuris atidaro EntityModal
 * naujo įrašo sukūrimui.
 */
type Props<T extends Record<string, any>> = {
  /** Mygtuko tekstas („+ Naujas …“) */
  buttonLabel: string;
  /** Modal’o antraštė, pvz. „Naujas klientas“ */
  modalTitle: string;
  /** Formos laukai */
  fields: FieldConfig<T>[];
  /** Išsaugojimo callback’as, grąžina `await onCreate(entity)` */
  onCreate: (newData: Omit<T, "id" | `${string}_id`>) => Promise<void>;
  /** Pradinės reikšmės (nebūtina) */
  initial?: Partial<T>;
};

export default function CreateEntityButton<T extends Record<string, any>>({
  buttonLabel,
  modalTitle,
  fields,
  onCreate,
  initial = {},
}: Props<T>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        {buttonLabel}
      </button>

      {open && (
        <EntityModal
          title={modalTitle}
          entity={initial as T}
          fields={fields}
          isOpen={open}
          startInEdit
          onClose={() => setOpen(false)}
          onSave={async (created) => {
            await onCreate(created as Omit<T, "id" | `${string}_id`>);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
