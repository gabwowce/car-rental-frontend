/**
 * ActionButtons.tsx
 *
 * Reusable UI component for displaying common table actions:
 * - Edit
 * - Delete
 * - View (optional)
 * - Extra action (e.g., email)
 *
 * ---
 * ## Props:
 *
 * ### `onView?: () => void`
 * Callback triggered when the "view" button is clicked (optional, not rendered unless explicitly shown).
 *
 * ### `onEdit?: () => void`
 * Callback triggered when the "edit" button is clicked.
 *
 * ### `onDelete?: () => void`
 * Callback triggered when the "delete" button is clicked.
 *
 * ### `onExtra?: () => void`
 * Callback triggered when the "extra" button is clicked (e.g., send email).
 *
 * ### `show?: { view?: boolean; edit?: boolean; delete?: boolean; extra?: boolean }`
 * - Determines which buttons to show.
 * - Default: `{ view: true, edit: true, delete: true }`
 *
 * ### `extraLabel?: string`
 * - Accessible label for the extra action button (screen readers).
 * - Default: `"Veiksmas"` (can be overridden to "Send Email", etc.).
 *
 * ---
 * ## Usage:
 *
 * ```tsx
 * <ActionButtons
 *   onEdit={() => console.log("Edit")}
 *   onDelete={() => console.log("Delete")}
 *   onExtra={() => console.log("Email")}
 *   show={{ edit: true, delete: true, extra: true }}
 *   extraLabel="Send Email"
 * />
 * ```
 *
 * ---
 * ## Icons:
 * - `FiEdit`: edit icon (green on hover)
 * - `FiTrash2`: delete icon (red on hover)
 * - `FiMail`: extra action (purple on hover)
 *
 * ---
 * ## Accessibility:
 * - Each button includes an `aria-label` for screen readers.
 * - Color transitions on hover for improved UX.
 */

import { FiEye, FiEdit, FiMail, FiTrash2 } from "react-icons/fi";

type ActionButtonsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onExtra?: () => void;
  show?: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
    extra?: boolean;
  };
  extraLabel?: string;
};

export function ActionButtons({
  onView,
  onEdit,
  onDelete,
  onExtra,
  show = { view: true, edit: true, delete: true },
  extraLabel = "Veiksmas",
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-3 text-lg text-gray-600">
      {show.edit && (
        <button
          onClick={onEdit}
          className="hover:text-green-600 transition-colors"
          aria-label="Redaguoti"
        >
          <FiEdit />
        </button>
      )}
      {show.extra && (
        <button
          onClick={onExtra}
          className="hover:text-purple-600 transition-colors"
          aria-label={extraLabel}
        >
          <FiMail />
        </button>
      )}
      {show.delete && (
        <button
          onClick={onDelete}
          className="hover:text-red-600 transition-colors"
          aria-label="Ištrinti"
        >
          <FiTrash2 />
        </button>
      )}
    </div>
  );
}
