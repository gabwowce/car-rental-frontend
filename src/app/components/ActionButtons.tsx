// components/ActionButtons.tsx
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

export default function ActionButtons({
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
