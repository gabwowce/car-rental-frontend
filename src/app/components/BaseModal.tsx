import React from "react";

type BaseModalProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  actions?: React.ReactNode; // optional action buttons
};

/**
 * `BaseModal` – Reusable centered modal dialog component.
 *
 * @param title - The modal's header text
 * @param children - Main modal content (form, message, etc.)
 * @param isOpen - Controls whether modal is shown
 * @param onClose - Function to close the modal (✕ button or external trigger)
 * @param actions - Optional bottom-right action buttons (e.g., Save, Cancel)
 *
 * @example
 * ```tsx
 * <BaseModal
 *   title="Edit Profile"
 *   isOpen={true}
 *   onClose={() => setModalOpen(false)}
 *   actions={
 *     <>
 *       <button onClick={handleSave}>Save</button>
 *       <button onClick={handleCancel}>Cancel</button>
 *     </>
 *   }
 * >
 *   <form>...</form>
 * </BaseModal>
 * ```
 *
 * @returns JSX modal window with overlay, content and optional actions
 */
export default function BaseModal({
  title,
  children,
  isOpen,
  onClose,
  actions,
}: BaseModalProps) {
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
