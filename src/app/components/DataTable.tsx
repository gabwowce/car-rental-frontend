import React from 'react'

type Column<T> = {
  label: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  className?: string
}

type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  rowKey: (row: T) => string | number
}

export default function DataTable<T>({
  columns,
  data,
  rowKey,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-xl shadow ring-1 ring-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    scope="col"
                    className={`px-6 py-3 text-left text-sm font-semibold text-gray-600 ${col.className ?? ''}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-sm text-gray-800">
              {data.map((row) => (
                <tr key={rowKey(row)} className="hover:bg-gray-50 transition">
                  {columns.map((col, idx) => (
                    <td
                      key={idx}
                      className={`px-6 py-4 whitespace-nowrap align-middle ${col.className ?? ''}`}
                    >
                      {typeof col.accessor === 'function'
                        ? col.accessor(row)
                        : (row[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
