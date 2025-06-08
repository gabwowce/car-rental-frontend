/**
 * BaseModal.tsx
 *
 * A generic, reusable modal component for displaying content in a centered dialog overlay.
 * Provides structure and styling for modals used across the application.
 *
 * ---
 * ## Props:
 *
 * ### `title: string`
 * - The modal’s heading displayed at the top of the dialog.
 *
 * ### `children: React.ReactNode`
 * - The main body content of the modal (can be text, form, or other components).
 *
 * ### `isOpen: boolean`
 * - Controls whether the modal is visible or hidden.
 * - When `false`, the modal is not rendered to the DOM.
 *
 * ### `onClose: () => void`
 * - Callback function triggered when the modal should be closed (e.g., clicking the close button).
 *
 * ### `actions?: React.ReactNode`
 * - Optional area for custom buttons at the bottom-right (e.g., "Save", "Cancel").
 *
 * ---
 * ## Features:
 * - Automatically centers the modal on screen
 * - Dims background with a semi-transparent black overlay
 * - Closes via ✕ icon in the top-right corner
 * - Animated entry with Tailwind `animate-fade-in` class
 * - Responsive width (`max-w-lg`)
 *
 * ---
 * ## Example usage:
 *
 * ```tsx
 * <BaseModal
 *   title="Edit Profile"
 *   isOpen={isModalOpen}
 *   onClose={() => setModalOpen(false)}
 *   actions={
 *     <>
 *       <button onClick={onSave}>Save</button>
 *       <button onClick={onClose}>Cancel</button>
 *     </>
 *   }
 * >
 *   <form>...</form>
 * </BaseModal>
 * ```
 *
 * ---
 * ## Notes:
 * - This component only handles layout and visibility. Use `EntityModal` or other wrappers for form logic.
 * - Ensure `isOpen` is controlled from the parent component using state.
 * - Tailwind utility `animate-fade-in` must be defined or imported if custom.
 */

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
