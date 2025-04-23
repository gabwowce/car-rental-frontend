'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

const menu = [
    { label: 'Dashboard', href: '/' },
    { label: 'Automobiliai', href: '/cars' },
    { label: 'Rezervacijos', href: '/reservations' },
    { label: 'Užsakymai', href: '/orders' },
    { label: 'Klientai', href: '/clients' },
    { label: 'Pagalbos užklausos', href: '/support' },
    { label: 'Sąskaitos', href: '/invoices' },
    { label: 'Profilis', href: '/profile' },
  ]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen px-4 py-6">
      <h2 className="text-2xl font-bold mb-8 text-center">AutoRent</h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  'block px-4 py-2 rounded hover:bg-gray-800 transition-colors',
                  pathname === item.href && 'bg-gray-800 font-semibold'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <footer className="mt-auto text-center text-sm text-gray-400 pt-6 border-t border-gray-700">
        © {new Date().getFullYear()} AutoRent
      </footer>
    </aside>
  )
}
