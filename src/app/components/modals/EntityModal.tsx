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
