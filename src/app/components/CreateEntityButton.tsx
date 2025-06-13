"use client";

import { useState } from "react";
import EntityModal from "./modals/EntityModal";

/**
 * Configuration for a single input field in the `EntityModal` form.
 */
export type FieldConfig<T extends Record<string, any>> = {
  name: keyof T & string;
  label: string;
  type?: "text" | "number" | "select" | "textarea";
  options?: { value: any; label: string }[];
  format?: (value: any, entity: T) => string;
};

/**
 * Props for the `CreateEntityButton` component.
 */
type Props<T extends Record<string, any>> = {
  /**
   * Label shown on the button (e.g., "+ New Client").
   */
  buttonLabel: string;

  /**
   * Title shown in the modal (e.g., "New Client").
   */
  modalTitle: string;

  /**
   * Configuration for the modal fields.
   */
  fields: FieldConfig<T>[];

  /**
   * Callback fired when the user submits the form.
   * Receives form data (excluding `id` or `${string}_id`).
   */
  onCreate: (newData: Omit<T, "id" | `${string}_id`>) => Promise<void>;

  /**
   * Optional initial values for the form.
   */
  initial?: Partial<T>;

  extraData?: {
    cars?: any[];
  };
};

/**
 * `CreateEntityButton` – A reusable button that opens a modal to create a new entity.
 *
 * @typeParam T - Entity shape (form data structure)
 *
 * @example
 * ```tsx
 * <CreateEntityButton
 *   buttonLabel="+ New Client"
 *   modalTitle="Create Client"
 *   fields={[{ name: "email", label: "Email", type: "text" }]}
 *   onCreate={async (data) => await api.addClient(data)}
 * />
 * ```
 */
export default function CreateEntityButton<T extends Record<string, any>>({
  buttonLabel,
  modalTitle,
  fields,
  onCreate,
  initial = {},
  extraData,
}: Props<T>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="bg-[#0F597B] text-[#F7F7F7]  px-4 py-2 rounded hover:bg-[#0C374D]"
        onClick={() => setOpen(true)}
      >
        {buttonLabel}
      </button>

      {open && (
        <EntityModal
          noCancel={true}
          title={modalTitle}
          entity={initial as T}
          fields={fields}
          isOpen={open}
          startInEdit
          extraData={extraData}
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
