import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

type ActionButtonsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  show?: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
  };
};

export default function ActionButtons({
  onEdit,
  onDelete,
  show = { view: true, edit: true, delete: true },
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
