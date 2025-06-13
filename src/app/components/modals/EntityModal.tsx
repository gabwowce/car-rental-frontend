"use client";
import { useEffect, useState } from "react";
import BaseModal from "@/app/components/BaseModal";

export interface FieldConfig<T extends Record<string, any>> {
  name?: keyof T & string;
  label: string;
  type?:
    | "text"
    | "number"
    | "select"
    | "textarea"
    | "autocomplete"
    | "password"
    | "date";
  options?: { value: any; label: string }[];
  format?: (value: any, entity: T) => string;
  required?: boolean;
  readonly?: boolean;
  render?: (data: T) => string;
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
  extraData?: {
    cars?: any[];
  };
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
  extraData,
}: EntityModalProps<T>) {
  const [form, setForm] = useState<T>(entity);
  const [isEditing, setIsEditing] = useState(startInEdit);
  const isValidDate = (d: any) => d instanceof Date && !isNaN(d.getTime());
  // Reset form when modal opens or entity changes
  useEffect(() => {
    setForm(entity);
    setIsEditing(startInEdit);
  }, [entity, startInEdit]);

  // 💡 Auto-calculate bendra_kaina
  useEffect(() => {
    if (!extraData?.cars?.length) return;
    if (!isEditing) return;
    const automId = Number((form as any).automobilio_id);
    const car = extraData?.cars?.find((c: any) => c.automobilio_id === automId);
    const start = new Date((form as any).nuomos_data);
    const end = new Date((form as any).grazinimo_data);
    if (car && !isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const diffDays = Math.max(
        1,
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      );
      const total = diffDays * car.kaina_parai;

      if ((form as any).bendra_kaina !== total) {
        setForm((prev) => ({ ...prev, bendra_kaina: total }));
      }
    }
  }, [
    form.automobilio_id,
    form.nuomos_data,
    form.grazinimo_data,
    extraData?.cars,
    isEditing,
  ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const cfg = fields.find((f) => f.name === name);

    if (cfg?.type === "autocomplete" && cfg.options) {
      const match = cfg.options.find((o) => o.label === value);
      setForm((prev) => ({
        ...prev,
        [name]: match ? Number(match.value) : prev[name], // → ID kaip number
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const commit = async () => {
    for (const f of fields) {
      if (f.required && f.name && !form[f.name]) {
        alert(`Laukas „${f.label}“ yra privalomas`);
        return;
      }
    }
    if (onSave) await onSave(form);
    setIsEditing(false);
    onClose();
  };

  const renderFieldView = (cfg: FieldConfig<T>) => {
    if (cfg.render) {
      return (
        <div key={cfg.label} className="flex flex-col gap-1">
          <span className="text-xs font-medium text-gray-500">{cfg.label}</span>
          <span className="text-sm break-all text-[#F7F7F7]">
            {cfg.render(form)}
          </span>
        </div>
      );
    }

    const raw = cfg.name ? entity[cfg.name] : "";
    const display = cfg.format ? cfg.format(raw, entity) : String(raw ?? "—");

    return (
      <div key={cfg.name} className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500">{cfg.label}</span>
        <span className="text-sm break-all text-[#F7F7F7]">{display}</span>
      </div>
    );
  };

  const renderFieldEdit = (cfg: FieldConfig<T>) => {
    if (cfg.readonly) {
      return renderFieldView(cfg);
    }

    const common = {
      name: cfg.name,
      value: cfg.name ? ((form as any)[cfg.name] ?? "") : "",
      onChange: handleChange,
      className:
        "border border-[#1C2B3A] bg-[#1A2238] text-[#F7F7F7] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#0F597B]/60 placeholder-gray-400",
    } as const;

    let input: JSX.Element;
    switch (cfg.type) {
      case "textarea":
        input = <textarea rows={3} {...common} />;
        break;
      case "select":
        input = (
          <select {...common}>
            <option value="" disabled hidden>
              — Pasirinkite —
            </option>
            {cfg.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        );
        break;
      case "autocomplete":
        input = (
          <>
            <input type="text" list={`${cfg.name}-list`} {...common} />
            <datalist id={`${cfg.name}-list`}>
              {cfg.options?.map((o) => (
                <option key={o.value} value={o.label} />
              ))}
            </datalist>
          </>
        );
        break;
      case "number":
        input = <input type="number" {...common} />;
        break;
      case "date":
        input = <input type="date" {...common} />;
        break;
      case "password":
        input = <input type="password" {...common} />;
        break;
      default:
        input = <input type="text" {...common} />;
    }

    return (
      <div key={cfg.name ?? cfg.label} className="flex flex-col gap-1">
        <label className="text-xs font-medium text-[#F7F7F7]">
          {cfg.label}
          {cfg.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {input}
      </div>
    );
  };

  const body = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 text-[#F7F7F7]">
      {fields.map((cfg) =>
        isEditing ? renderFieldEdit(cfg) : renderFieldView(cfg)
      )}
    </div>
  );

  const actions = isEditing ? (
    <>
      {!noCancel && (
        <button
          onClick={() => {
            setIsEditing(false);
            setForm(entity);
          }}
          className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
        >
          Atšaukti
        </button>
      )}
      {onSave && (
        <button
          onClick={commit}
          className="px-4 py-2 rounded bg-[#0F597B] text-[#F7F7F7] hover:bg-[#0C374D]"
        >
          Išsaugoti
        </button>
      )}
    </>
  ) : (
    onSave && (
      <button
        onClick={() => setIsEditing(true)}
        className="px-4 py-2 rounded bg-[#0F597B] text-[#F7F7F7] hover:bg-[#0C374D]"
      >
        Redaguoti
      </button>
    )
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
