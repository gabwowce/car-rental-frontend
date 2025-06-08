type Props = {
  /** Status string that determines badge styling and text */
  status: string;
};

/**
 * Maps various status values to Tailwind CSS class strings for styling.
 *
 * Supports multiple synonyms and formatting variations for consistent UI representation.
 */
const statusMap: Record<string, string> = {
  // Shared statuses across different entities
  patvirtinta: "bg-blue-100 text-blue-800",
  užbaigta: "bg-yellow-100 text-yellow-800",
  apmokėta: "bg-green-100 text-green-800",
  aktyvi: "bg-green-100 text-green-800",
  vykdomas: "bg-blue-100 text-blue-800",
  atšaukta: "bg-red-100 text-red-800",
  atšauktas: "bg-red-100 text-red-800",
  laukia: "bg-yellow-100 text-yellow-800",
  laukiama: "bg-yellow-100 text-yellow-800",
  vėluojanti: "bg-red-100 text-red-800",
  išrašyta: "bg-gray-100 text-gray-800",
  vykdoma: "bg-blue-100 text-blue-800",
  uzbaigta: "bg-green-100 text-green-800", // fallback without diacritics
  atsaukta: "bg-red-100 text-red-800", // fallback without diacritics
};

/**
 * StatusBadge component displays a stylized badge based on a given status string.
 *
 * @param {Props} props - Contains the `status` to display and style.
 *
 * @example
 * <StatusBadge status="apmokėta" />
 */
export default function StatusBadge({ status }: Props) {
  // Fallback style if the status is unknown
  const cls = statusMap[status] || "bg-gray-50 text-gray-600";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}
