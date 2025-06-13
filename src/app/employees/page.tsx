"use client";
import DataTable from "../components/DataTable";
import { ActionButtons } from "../components/ActionButtons";
import EntityModal from "../components/modals/EntityModal";
import CreateEntityButton from "@/app/components/CreateEntityButton";
import LoadingScreen from "@/app/components/loadingScreen";
import { useEmployeesData } from "@/hooks/useEmployeesData";

/**
 * `EmployeesPage` – Admin interface for managing employee records in the AutoRent system.
 *
 * ## Features:
 * - Searchable and filterable employee list
 * - Create / edit / delete functionality with confirmation
 * - Modal forms for entry using `EntityModal` and `CreateEntityButton`
 * - Password field is securely handled as `type: password`
 * - Role field is dynamically converted to a select dropdown
 *
 * ## Data flow:
 * Uses `useEmployeesData()` custom hook which provides:
 * - API data (`employees`, `filtered`, `isLoading`)
 * - CRUD actions (mutations for create / update / delete)
 * - Form field config (`employeeFields`) with built-in select/password types
 * - UI state (search, filters, modal visibility)
 */
export default function EmployeesPage() {
  const {
    employees,
    filtered,
    isLoading,
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
  } = useEmployeesData();

  const creationFields = [
    ...employeeFields,
    {
      name: "repeat_slaptazodis",
      label: "Pakartokite slaptažodį",
      type: "password",
      required: true,
    },
  ]; // password jau priskiriamas hooke
  const updateFields = employeeFields.filter((f) => f.name !== "slaptazodis");

  const columns = updateFields.map((f) => ({
    label: f.label,
    accessor:
      f.name === "atlyginimas"
        ? (row: any) => `${row.atlyginimas.toFixed(2)} €`
        : (f.name as string),
  }));

  columns.push({
    label: "Veiksmai",
    accessor: (row: any) => (
      <ActionButtons
        onEdit={() => {
          setSelectedEmployee(row);
          setModalOpen(true);
        }}
        onDelete={async () => {
          const ok = window.confirm(
            `Ištrinti darbuotoją „${row.vardas} ${row.pavarde}“?`
          );
          if (!ok) return;
          try {
            await deleteEmployee({ employeeId: row.darbuotojo_id }).unwrap();
            setSelectedEmployee(null);
            await refetch();
          } catch (err) {
            alert("Negalima ištrinti šio darbuotojo.");
            console.error("Delete error", err);
          }
        }}
      />
    ),
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="space-y-6 text-[#707070]">
      {/* Header + Create */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#F7F7F7] ">Darbuotojai</h1>
        <CreateEntityButton
          buttonLabel="+ Pridėti darbuotoją"
          modalTitle="Naujas darbuotojas"
          fields={creationFields}
          onCreate={async (data) => {
            try {
              if (data.slaptazodis !== data.repeat_slaptazodis) {
                alert("Slaptažodžiai nesutampa.");
              }

              const prepared = {
                vardas: data.vardas ?? "",
                pavarde: data.pavarde ?? "",
                el_pastas: data.el_pastas ?? "",
                telefono_nr: data.telefono_nr ?? "",
                pareigos: data.pareigos ?? "",
                atlyginimas: Number(data.atlyginimas ?? 0),
                isidarbinimo_data:
                  data.isidarbinimo_data ??
                  new Date().toISOString().slice(0, 10),
                slaptazodis: data.slaptazodis ?? "",
              };

              await createEmployee({ employeeCreate: prepared }).unwrap();
              await refetch();
              alert("Darbuotojas sukurtas sėkmingai!");
            } catch (e) {
              alert("Nepavyko sukurti darbuotojo.");
              console.error("Create error:", e);
            }
          }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Ieškoti…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <select
          className="border p-2 rounded"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="visi">Visos pareigos</option>
          {[...new Set(employees.map((e) => e.pareigos))].sort().map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Data table */}
      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(e) => e.darbuotojo_id}
        itemsPerPage={5}
      />

      {/* Edit modal */}
      {selectedEmployee && (
        <EntityModal
          title={`Darbuotojas: ${selectedEmployee.vardas} ${selectedEmployee.pavarde}`}
          entity={selectedEmployee}
          fields={updateFields}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={async (updated) => {
            try {
              await updateEmployee({
                employeeId: selectedEmployee.darbuotojo_id,
                employeeUpdate: updated,
              }).unwrap();
              await refetch();
              setModalOpen(false);
            } catch (e) {
              alert("Nepavyko atnaujinti darbuotojo.");
              console.error("Update error:", e);
            }
          }}
        />
      )}
    </div>
  );
}
