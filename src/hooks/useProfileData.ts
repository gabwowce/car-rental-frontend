/**
 * useProfileData
 *
 * Custom React hook for managing employee profile data and password updates
 * within the AutoRent system. This hook handles retrieving the current user,
 * managing form state for password change, and performing the update mutation.
 *
 * ---
 * ## Features:
 * - Fetches the currently authenticated employee using `useMeApiV1MeGetQuery`
 * - Manages local state for old, new, and repeat password fields
 * - Provides a `handleSubmit` function to validate and update the password
 * - Returns a status message for user feedback
 *
 * ---
 * ## Returns:
 * ```ts
 * {
 *   user: UserInfo | undefined;                // Current logged-in user info
 *   isLoading: boolean;                        // Loading state for user fetch
 *   oldPassword: string;                       // Current form value for old password
 *   newPassword: string;                       // New password value
 *   repeatPassword: string;                    // Repeated new password value
 *   setOldPassword: (val: string) => void;     // Update old password
 *   setNewPassword: (val: string) => void;     // Update new password
 *   setRepeatPassword: (val: string) => void;  // Update repeat password
 *   handleSubmit: (e: FormEvent) => void;      // Submit handler for form
 *   message: string;                           // Feedback message for user
 * }
 * ```
 *
 * ---
 * ## Example Usage:
 * ```tsx
 * const {
 *   user,
 *   isLoading,
 *   oldPassword,
 *   newPassword,
 *   repeatPassword,
 *   setOldPassword,
 *   setNewPassword,
 *   setRepeatPassword,
 *   handleSubmit,
 *   message,
 * } = useProfileData();
 *
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
 *     ...
 *     <button type="submit">Change Password</button>
 *     {message && <p>{message}</p>}
 *   </form>
 * );
 * ```
 */

import { useState } from "react";
import {
  useMeApiV1MeGetQuery,
  useChangePasswordMutation,
} from "@/store/carRentalApi";

export function useProfileData() {
  const { data: user, isLoading } = useMeApiV1MeGetQuery();
  const [changePassword] = useChangePasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== repeatPassword) {
      setMessage("Slaptažodžiai nesutampa");
      return;
    }

    try {
      await changePassword({
        changePasswordRequest: {
          senas_slaptazodis: oldPassword,
          naujas_slaptazodis: newPassword,
        },
      }).unwrap();

      setMessage("Slaptažodis pakeistas sėkmingai");
      setOldPassword("");
      setNewPassword("");
      setRepeatPassword("");
    } catch (error) {
      console.error("Klaida keičiant slaptažodį", error);
      setMessage("Nepavyko pakeisti slaptažodžio");
    }
  };

  return {
    user,
    isLoading,
    oldPassword,
    newPassword,
    repeatPassword,
    setOldPassword,
    setNewPassword,
    setRepeatPassword,
    handleSubmit,
    message,
  };
}
