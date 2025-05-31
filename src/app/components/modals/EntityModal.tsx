import { useEffect, useState } from "react";
import BaseModal from "@/app/components/BaseModal";

/**
 * Universal, type‑safe modal for viewing & editing any entity.
 * Pass a `fields` array that describes what should be rendered.
 */
export interface FieldConfig<T extends Record<string, any>> {
  /** Property name on the entity */
  name: keyof T & string;
  /** Visible label */
  label: string;
  /** Form input type */
  type?: "text" | "number" | "select" | "textarea";
  /** Select options, if `type` is "select" */
  options?: { value: any; label: string }[];
  /** Optional formatter for read‑only view */
  format?: (value: any, entity: T) => string;
}

export interface EntityModalProps<T extends Record<string, any>> {
  title: string;
  /** The entity object we display/edit. */
  entity: T;
  isOpen: boolean;
  onClose: () => void;
  /** onSave is optional; omit it for read‑only modals. */
  onSave?: (updated: T) => void;
  /** Field configuration */
  fields: FieldConfig<T>[];
  /** Start modal in edit mode */
  startInEdit?: boolean;
}

export default function EntityModal<T extends Record<string, any>>({
  title,
  entity,
  isOpen,
  onClose,
  onSave,
  fields,
  startInEdit = false,
}: EntityModalProps<T>) {
  const [form, setForm] = useState<T>(entity);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setForm(entity);
    setIsEditing(startInEdit);
  }, [entity, startInEdit]);

  // ----- helpers -----
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const commit = async () => {
    if (onSave) {
      await onSave(form); // 👈 laukiam kol `CarsPage` atnaujins DB
    }
    setIsEditing(false); // grįžtam į view mode
    onClose(); // uždarom modalą
  };
  // ----- renderers -----
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
        case "number":
          return <input type="number" {...common} />;
        default:
          return <input type="text" {...common} />;
      }
    })();

    return (
      <div key={cfg.name} className="flex flex-col gap-1">
        <label htmlFor={cfg.name} className="text-xs font-medium text-gray-600">
          {cfg.label}
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
      <button
        onClick={() => {
          setIsEditing(false);
          setForm(entity); // reset changes
        }}
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
      >
        Atšaukti
      </button>
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
