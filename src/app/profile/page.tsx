"use client";

import { useState, FormEvent } from "react";
import {
  useMeApiV1MeGetQuery,
  useChangePasswordMutation,
} from "@/store/carRentalApi";

/**
 * ProfilePage – Displays the current employee's profile and allows password changes.
 *
 * Features:
 * - Fetches the current user's profile using `useMeApiV1MeGetQuery()`
 * - Displays user info: name, surname, email, and role
 * - Provides a form to change the password using `useChangePasswordMutation()`
 * - Validates if the repeated password matches before submitting
 * - Displays form state and error messages inline
 *
 * This page is intended for logged-in users only.
 *
 * @returns {JSX.Element} Rendered profile page with user data and password change form
 */
export default function ProfilePage() {
  /** User Info Query */
  const { data: user, isLoading, isError, error } = useMeApiV1MeGetQuery();
  const [changePassword, { isLoading: isChanging }] =
    useChangePasswordMutation();

  /** Form State */
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  /**
   * Handles password change form submission.
   *
   * @param {FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== repeatPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      await changePassword({
        changePasswordRequest: {
          senas_slaptazodis: oldPassword,
          naujas_slaptazodis: newPassword,
        },
      }).unwrap();
      alert("Password changed successfully.");
      setOldPassword("");
      setNewPassword("");
      setRepeatPassword("");
      setMessage("");
    } catch {
      alert("Failed to change password.");
    }
  };

  /** Conditional Rendering for States */
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as any)?.status}</p>;
  if (!user) return <p>User data not found.</p>;

  /** Rendered UI */
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Employee Info */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Employee Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p>
            <span className="font-medium">Name:</span> {user.vardas}
          </p>
          <p>
            <span className="font-medium">Surname:</span> {user.pavarde}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.el_pastas}
          </p>
          <p>
            <span className="font-medium">Role:</span> {user.pareigos}
          </p>
        </div>
      </section>

      {/* Password Change Form */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 max-w-md"
        >
          <input
            type="password"
            placeholder="Current password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Repeat new password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            disabled={isChanging}
          >
            {isChanging ? "Changing..." : "Save Changes"}
          </button>
          {message && <p className="text-sm text-red-500">{message}</p>}
        </form>
      </section>
    </div>
  );
}
