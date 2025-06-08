import { useState } from "react";
import {
  useMeApiV1MeGetQuery,
  useChangePasswordMutation,
} from "@/store/carRentalApi";

/**
 * React hook for managing employee profile and password update functionality.
 *
 * Handles the current user info retrieval and local state for password change form.
 * Provides password validation and handles mutation errors gracefully.
 */
export function useProfileData() {
  /**
   * Fetched user data of the currently authenticated employee.
   */
  const { data: user, isLoading } = useMeApiV1MeGetQuery();

  /**
   * Mutation function to change the password via API.
   */
  const [changePassword] = useChangePasswordMutation();

  /**
   * Old password input value.
   */
  const [oldPassword, setOldPassword] = useState("");

  /**
   * New password input value.
   */
  const [newPassword, setNewPassword] = useState("");

  /**
   * Confirmation field for new password.
   */
  const [repeatPassword, setRepeatPassword] = useState("");

  /**
   * Feedback message to display to the user.
   */
  const [message, setMessage] = useState("");

  /**
   * Handles password change form submission.
   *
   * @param e - React form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure new password and confirmation match
    if (newPassword !== repeatPassword) {
      setMessage("Slaptažodžiai nesutampa");
      return;
    }

    try {
      // Attempt to change password via API mutation
      await changePassword({
        changePasswordRequest: {
          senas_slaptazodis: oldPassword,
          naujas_slaptazodis: newPassword,
        },
      }).unwrap();

      // Reset form and show success message
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
    user, // Currently authenticated user
    isLoading, // Is user data loading
    oldPassword, // Current value of old password
    newPassword, // New password input
    repeatPassword, // Repeated new password input
    setOldPassword, // Setter for old password
    setNewPassword, // Setter for new password
    setRepeatPassword, // Setter for repeat password
    handleSubmit, // Form submit handler
    message, // User-facing feedback message
  };
}
