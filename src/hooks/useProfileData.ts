// hooks/useProfileData.ts
import { useState } from "react";
import { useGetCurrentUserApiV1EmployeesMeGetQuery, useChangePasswordApiV1EmployeesChangePasswordPostMutation } from "@/store/carRentalApi";

export function useProfileData() {
  const { data: user, isLoading } = useGetCurrentUserApiV1EmployeesMeGetQuery();
  const [changePassword] = useChangePasswordApiV1EmployeesChangePasswordPostMutation();

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
        senas_slaptazodis: oldPassword,
        naujas_slaptazodis: newPassword,
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
