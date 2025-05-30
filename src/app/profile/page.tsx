"use client";

import { useState } from "react";
import {
  useMeApiV1MeGetQuery,
  useChangePasswordMutation,
} from "@/store/carRentalApi"; // <-- pritaikyk path
import type { FormEvent } from "react";

export default function ProfilePage() {
  const { data: user, isLoading } = useMeApiV1MeGetQuery();
  const [changePassword, { isLoading: isChanging }] =
    useChangePasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== repeatPassword) {
      setMessage("Slaptažodžiai nesutampa.");
      return;
    }
    try {
      await changePassword({
        changePasswordRequest: {
          senas_slaptazodis: oldPassword,
          naujas_slaptazodis: newPassword,
        },
      }).unwrap();
      setMessage("Slaptažodis pakeistas sėkmingai.");
      setOldPassword("");
      setNewPassword("");
      setRepeatPassword("");
    } catch (err: any) {
      setMessage("Klaida keičiant slaptažodį.");
    }
  };

  if (isLoading) return <p>Įkeliama...</p>;
  if (!user) return <p>Nerasta vartotojo duomenų</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profilis</h1>

      {/* Informacija apie naudotoją */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Darbuotojo informacija</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p>
            <span className="font-medium">Vardas:</span> {user.vardas}
          </p>
          <p>
            <span className="font-medium">Pavardė:</span> {user.pavarde}
          </p>
          <p>
            <span className="font-medium">El. paštas:</span> {user.el_pastas}
          </p>
          <p>
            <span className="font-medium">Rolė:</span> {user.pareigos}
          </p>
        </div>
      </div>

      {/* Slaptažodžio keitimas */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Keisti slaptažodį</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 max-w-md"
        >
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
            disabled={isChanging}
          >
            {isChanging ? "Keičiama..." : "Išsaugoti pakeitimus"}
          </button>
          {message && <p className="text-sm text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
}
