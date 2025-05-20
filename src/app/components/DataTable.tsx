import React, { useState, useMemo } from 'react'

type Column<T> = {
  label: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  className?: string
}

type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  rowKey: (row: T) => string | number
  itemsPerPage?: number // 👈 naujas props
}

export default function DataTable<T>({
  columns,
  data,
  rowKey,
  itemsPerPage = 10, // 👈 default reikšmė
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage
    return data.slice(startIdx, startIdx + itemsPerPage)
  }, [currentPage, data, itemsPerPage])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

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
              {paginatedData.map((row) => (
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

        {/* 🔢 Pagination controls */}
        <div className="flex items-center justify-between px-6 py-4 text-sm text-gray-700">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            « Prev
          </button>

          <div className="space-x-1">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === idx + 1 ? 'bg-gray-200 font-bold' : ''
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Next »
          </button>
        </div>
      </div>
    </div>
  )
}
