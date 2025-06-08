/**
 * EntityModal.tsx
 *
 * Reusable modal component for displaying and editing any generic entity.
 * Uses a dynamic form layout driven by a `FieldConfig` array.
 *
 * ---
 * ## Props:
 *
 * ### `title: string`
 * Modal title displayed at the top.
 *
 * ### `entity: T`
 * The object to display/edit. Initial values come from this object.
 *
 * ### `isOpen: boolean`
 * Controls whether the modal is visible.
 *
 * ### `onClose: () => void`
 * Called when the modal is closed (e.g., after saving or canceling).
 *
 * ### `onSave?: (updated: T) => void`
 * Optional callback for when "Save" is clicked. Passes updated entity.
 *
 * ### `fields: FieldConfig<T>[]`
 * Describes each form field (label, type, validation, etc.).
 *
 * ### `startInEdit?: boolean`
 * If `true`, modal starts in editing mode. Default is `false`.
 *
 * ### `noCancel?: boolean`
 * If `true`, hides the cancel button in edit mode.
 *
 * ---
 * ## FieldConfig<T>:
 *
 * Defines a single field in the form.
 *
 * ```ts
 * type FieldConfig<T> = {
 *   name: keyof T & string;         // property key
 *   label: string;                  // field label
 *   type?: "text" | "number" | "select" | "textarea" | "autocomplete" | "date";
 *   options?: { value: any, label: string }[]; // used for select/autocomplete
 *   format?: (value: any, entity: T) => string; // custom formatter for view mode
 *   required?: boolean;             // shows red asterisk & validates presence
 * };
 * ```
 *
 * ---
 * ## Features:
 * - Supports view & edit modes (toggleable).
 * - Displays fields in a 2-column layout on larger screens.
 * - Field types supported:
 *   - Text input
 *   - Textarea
 *   - Number input
 *   - Date input
 *   - Select dropdown
 *   - Autocomplete (`<datalist>`)
 * - Optional formatting for read-only view mode.
 * - Validation for required fields before saving.
 * - Integrated with a generic `BaseModal`.
 *
 * ---
 * ## Example usage:
 *
 * ```tsx
 * <EntityModal
 *   title="Edit Car"
 *   entity={car}
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   onSave={(updated) => updateCar(updated)}
 *   fields={[
 *     { name: "make", label: "Make", required: true },
 *     { name: "model", label: "Model", required: true },
 *     { name: "year", label: "Year", type: "number" },
 *     { name: "available", label: "Available", type: "select", options: [
 *        { value: true, label: "Yes" },
 *        { value: false, label: "No" }
 *     ]}
 *   ]}
 * />
 * ```
 *
 * ---
 * ## Accessibility:
 * - Inputs use associated `<label>` tags.
 * - Focus ring and accessible states applied.
 *
 * ---
 * ## Notes:
 * - Input state is reset when switching between view/edit or closing modal.
 * - Date and number types are supported natively by HTML inputs.
 */

"use client";
import { useEffect, useState } from "react";
import BaseModal from "@/app/components/BaseModal";

export interface FieldConfig<T extends Record<string, any>> {
  name: keyof T & string;
  label: string;
  type?: "text" | "number" | "select" | "textarea" | "autocomplete" | "date";
  options?: { value: any; label: string }[];
  format?: (value: any, entity: T) => string;
  required?: boolean;
}

export interface EntityModalProps<T extends Record<string, any>> {
  title: string;
  entity: T;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (updated: T) => void;
  fields: FieldConfig<T>[];
  startInEdit?: boolean;
  noCancel?: boolean;
}

export default function EntityModal<T extends Record<string, any>>({
  title,
  entity,
  isOpen,
  onClose,
  onSave,
  fields,
  noCancel,
  startInEdit = false,
}: EntityModalProps<T>) {
  const [form, setForm] = useState<T>(entity);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setForm(entity);
    setIsEditing(startInEdit);
  }, [entity, startInEdit]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const field = fields.find((f) => f.name === name);

    // autocomplete: iš label rasti value
    if (field?.type === "autocomplete" && field.options) {
      const match = field.options.find((opt) => opt.label === value);
      setForm((prev) => ({ ...prev, [name]: match?.value ?? value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const commit = async () => {
    for (const f of fields) {
      if (f.required && !form[f.name]) {
        alert(`Laukas „${f.label}“ yra privalomas`);
        return;
      }
    }

    if (onSave) await onSave(form);
    setIsEditing(false);
    onClose();
  };

  const renderFieldView = (cfg: FieldConfig<T>) => {
    const raw = entity[cfg.name];
    const display = cfg.format ? cfg.format(raw, entity) : String(raw ?? "—");
    return (
      <div key={String(cfg.name)} className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-600">{cfg.label}</span>
        <span className="text-sm text-gray-900 break-all">{display}</span>
      </div>
    );
  };

  const renderFieldEdit = (cfg: FieldConfig<T>) => {
    const common = {
      name: cfg.name,
      value: (form as any)[cfg.name] ?? "",
      onChange: handleChange,
      className:
        "border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600/50",
    } as const;

    const inputField = (() => {
      switch (cfg.type) {
        case "textarea":
          return <textarea rows={3} {...common} />;
        case "select":
          return (
            <select {...common}>
              {cfg.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          );
        case "autocomplete":
          return (
            <>
              <input type="text" list={`${cfg.name}-list`} {...common} />
              <datalist id={`${cfg.name}-list`}>
                {cfg.options?.map((opt) => (
                  <option key={opt.value} value={opt.label} />
                ))}
              </datalist>
            </>
          );
        case "number":
          return <input type="number" {...common} />;
        case "date":
          return <input type="date" {...common} />;
        default:
          return <input type="text" {...common} />;
      }
    })();

    return (
      <div key={cfg.name} className="flex flex-col gap-1">
        <label htmlFor={cfg.name} className="text-xs font-medium text-gray-600">
          {cfg.label}
          {cfg.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {inputField}
      </div>
    );
  };

  const body = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
      {fields?.map((cfg) =>
        isEditing ? renderFieldEdit(cfg) : renderFieldView(cfg)
      )}
    </div>
  );

  const actions = isEditing ? (
    <>
      {noCancel || (
        <button
          onClick={() => {
            setIsEditing(false);
            setForm(entity);
          }}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Atšaukti
        </button>
      )}
      {onSave && (
        <button
          onClick={commit}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Išsaugoti
        </button>
      )}
    </>
  ) : (
    <>
      {onSave && (
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Redaguoti
        </button>
      )}
    </>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={() => {
        setIsEditing(false);
        onClose();
      }}
      title={title}
      actions={actions}
    >
      {body}
    </BaseModal>
  );
}
