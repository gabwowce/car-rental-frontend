'use client'

import { useState } from 'react'

export default function ProfilePage() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  // Feikinis naudotojo objektas
  const user = {
    vardas: 'Tomas',
    pavarde: 'Vaitkus',
    el_pastas: 'tomas@autorent.lt',
    role: 'Administratorius',
    prisijunge: '2025-04-25 09:12',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profilis</h1>

      {/* Informacija apie naudotoją */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Darbuotojo informacija</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p><span className="font-medium">Vardas:</span> {user.vardas}</p>
          <p><span className="font-medium">Pavardė:</span> {user.pavarde}</p>
          <p><span className="font-medium">El. paštas:</span> {user.el_pastas}</p>
          <p><span className="font-medium">Rolė:</span> {user.role}</p>
          <p><span className="font-medium">Paskutinis prisijungimas:</span> {user.prisijunge}</p>
        </div>
      </div>

      {/* Slaptažodžio keitimas */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Keisti slaptažodį</h2>
        <form className="grid grid-cols-1 gap-4 max-w-md">
          <input
            type="password"
            placeholder="Dabartinis slaptažodis"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Naujas slaptažodis"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Pakartoti naują slaptažodį"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Išsaugoti pakeitimus
          </button>
        </form>
      </div>
    </div>
  )
}
