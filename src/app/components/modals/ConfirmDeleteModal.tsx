"use client";

import BaseModal from "@/app/components/BaseModal";
import { ReactNode } from "react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityName?: string; // Pvz.: "automobilį", "rezervaciją", t.t.
  title?: string; // Galima perrašyti
  children?: ReactNode; // Jeigu norisi pilnesnio turinio
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  entityName = "įrašą",
  title = "Ar tikrai norite ištrinti?",
  children,
}: ConfirmDeleteModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      actions={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Atšaukti
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Ištrinti
          </button>
        </>
      }
    >
      {children ?? (
        <p className="text-sm text-gray-700">
          Ar tikrai norite ištrinti šį {entityName}?
        </p>
      )}
    </BaseModal>
  );
}
