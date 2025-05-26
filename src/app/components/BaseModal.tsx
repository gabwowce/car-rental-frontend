// components/ui/BaseModal.tsx
import React from "react";

export default function BaseModal({
  title,
  children,
  isOpen,
  onClose,
  actions,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  actions?: React.ReactNode; // mygtukai apačioje
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(34,34,34,0.8)]">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Uždaryti modalą"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="text-sm">{children}</div>

        {actions && (
          <div className="mt-6 flex justify-end gap-3">{actions}</div>
        )}
      </div>
    </div>
  );
}
