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
  patvirtinta: "bg-[#12344D] text-[#F7F7F7] ",
  užbaigta: "bg-[#3D3F5A] text-[#F7F7F7] ",
  apmokėta: "bg-[#1E2B45] text-[#F7F7F7] ",
  aktyvi: "bg-[#1E2B45] text-[#F7F7F7] ",
  vykdomas: "bg-[#163858] text-[#F7F7F7] ",
  atšaukta: "bg-[#5B2C3A] text-[#F7F7F7] ",
  laukia: "bg-[#4F4F4F] text-[#F7F7F7] ",
  vėluojanti: "bg-[#5B2C3A] text-[#F7F7F7] ",
  išrašyta: "bg-[#333645] text-[#F7F7F7] ",
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
