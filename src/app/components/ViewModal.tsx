import React from "react";
import { Dialog } from "@headlessui/react";

type ViewModalProps = {
  /** Whether the modal is open */
  isOpen: boolean;

  /** Function to close the modal */
  onClose: () => void;

  /** Optional title displayed at the top of the modal */
  title?: string;

  /** The content (JSX) to display inside the modal */
  content: React.ReactNode;
};

/**
 * A reusable read-only modal component using Headless UI's Dialog.
 *
 * @param {ViewModalProps} props - Props for controlling modal visibility, content, and close behavior
 *
 * @example
 * <ViewModal
 *   isOpen={modalOpen}
 *   onClose={() => setModalOpen(false)}
 *   title="Peržiūrėti informaciją"
 *   content={<p>Sveiki atvykę!</p>}
 * />
 */
export default function ViewModal({
  isOpen,
  onClose,
  title,
  content,
}: ViewModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Overlay background */}
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        {/* Modal content container */}
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 z-10">
          {/* Optional modal title */}
          {title && (
            <Dialog.Title className="text-xl font-semibold mb-4">
              {title}
            </Dialog.Title>
          )}

          {/* Dynamic content passed via props */}
          <div>{content}</div>

          {/* Close button */}
          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Užverti
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
