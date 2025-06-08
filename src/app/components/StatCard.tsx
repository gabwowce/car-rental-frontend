import { ReactNode } from "react";

type StatCardProps = {
  /** The title or label shown at the top of the card (e.g., "Total Clients") */
  title: string;

  /** The main value or number to display (e.g., 128) */
  value: string | number;

  /** Optional background color class (e.g., "bg-blue-100"). Defaults to gray. */
  color?: string;

  /** Optional icon displayed on the right side of the header */
  icon?: ReactNode;
};

/**
 * `StatCard` is a compact summary component for dashboards.
 * Displays a title, numeric value, and optional icon with configurable background.
 *
 * @param {StatCardProps} props - The props object
 * @returns A styled card with title, value, and optional icon
 *
 * @example
 * <StatCard title="Total Orders" value={134} color="bg-green-100" icon={<ChartIcon />} />
 */
export default function StatCard({
  title,
  value,
  color = "bg-gray-100",
  icon,
}: StatCardProps) {
  return (
    <div
      className={`${color} p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* Header with title and optional icon */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-gray-600">{title}</h2>
        {icon && <div className="text-xl text-gray-700">{icon}</div>}
      </div>

      {/* Main value */}
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
