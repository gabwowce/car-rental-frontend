import { useState, useMemo } from "react";
import {
  useGetAllEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "@/store/carRentalApi";

/**
 * `useEmployeesData` – Custom React hook for managing employee data in the AutoRent admin system.
 *
 * This hook integrates API queries and mutations with local state to manage:
 * - employee listing and filtering
 * - CRUD operations
 * - search and role filtering
 * - modal state and selection
 *
 * @returns {object} Hook state and handlers:
 * @property {Employee[]} employees - Full list of employees from the API
 * @property {boolean} isLoading - Whether employee data is being loaded
 * @property {Employee[]} filtered - Filtered employees based on search/role
 * @property {string} search - Current search string
 * @property {function} setSearch - Function to update the search string
 * @property {string} roleFilter - Current selected role filter
 * @property {function} setRoleFilter - Function to update the role filter
 * @property {Employee|null} selectedEmployee - Currently selected employee for editing
 * @property {function} setSelectedEmployee - Function to set selected employee
 * @property {boolean} isModalOpen - Whether the edit/create modal is open
 * @property {function} setModalOpen - Function to toggle modal visibility
 * @property {function} createEmployee - Mutation hook for creating a new employee
 * @property {function} updateEmployee - Mutation hook for updating an employee
 * @property {function} deleteEmployee - Mutation hook for deleting an employee
 * @property {function} refetch - Refetches all employee data from the API
 * @property {FieldConfig[]} employeeFields - Array of field definitions for use in modals/forms
 *
 * @example
 * const {
 *   employees, filtered, search, setSearch, createEmployee,
 *   selectedEmployee, setSelectedEmployee, isModalOpen, setModalOpen
 * } = useEmployeesData();
 */
export function useEmployeesData() {
  const { data = [], isLoading, refetch } = useGetAllEmployeesQuery();
  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("visi");

  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const roles = useMemo(
    () => [...new Set(data.map((e) => e.pareigos))].sort(),
    [data]
  );

  const filtered = useMemo(() => {
    return data.filter((emp) => {
      const matchSearch =
        emp.vardas.toLowerCase().includes(search.toLowerCase()) ||
        emp.pavarde.toLowerCase().includes(search.toLowerCase()) ||
        emp.el_pastas.toLowerCase().includes(search.toLowerCase());

      const matchRole =
        roleFilter === "visi" ||
        emp.pareigos.toLowerCase() === roleFilter.toLowerCase();

      return matchSearch && matchRole;
    });
  }, [data, search, roleFilter]);

  const employeeFields = [
    { name: "vardas", label: "Vardas", type: "text", required: true },
    { name: "pavarde", label: "Pavardė", type: "text", required: true },
    { name: "el_pastas", label: "El. paštas", type: "text", required: true },
    {
      name: "telefono_nr",
      label: "Telefono numeris",
      type: "text",
      required: true,
    },
    {
      name: "pareigos",
      label: "Pareigos",
      type: "select",
      options: roles.map((r) => ({ value: r, label: r })),
      required: true,
    },
    {
      name: "atlyginimas",
      label: "Atlyginimas (€)",
      type: "number",
      required: true,
    },
    {
      name: "isidarbinimo_data",
      label: "Įsidarbinimo data",
      type: "date",
      required: true,
    },
    {
      name: "slaptazodis",
      label: "Slaptažodis",
      type: "password",
      required: true,
    },
  ];
  return {
    employees: data,
    isLoading,
    filtered,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    selectedEmployee,
    setSelectedEmployee,
    isModalOpen,
    setModalOpen,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    refetch,
    employeeFields,
  };
}
