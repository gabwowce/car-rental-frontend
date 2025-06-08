import { useUpdateCarMutation } from "@/store/carRentalApi";
import { useGetAllCarsQuery } from "@/store/enhanceEndpoints";
import { useState } from "react";
import EntityModal, { FieldConfig } from "@/app/components/modals/EntityModal";

type Automobilis = NonNullable<
  ReturnType<typeof useGetAllCarsQuery>["data"]
>[number];

/**
 * Custom React hook `useCarsData` for managing and interacting with car data in the AutoRent system.
 *
 * This hook fetches all cars from the API and provides filtering, search, modal handling,
 * and a preconfigured set of field definitions (`carFields`) for forms (e.g., in `EntityModal`).
 *
 * ## Features:
 * - Fetches all cars using RTK Query
 * - Provides filtering by car status and text search (brand, model, plate)
 * - Handles modal open/close and selected car state
 * - Supplies dynamic form field configuration for create/edit modals
 *
 * ## Returns:
 * - `automobiliai` - raw car list from API
 * - `isLoading` - whether cars are being fetched
 * - `filtered` - filtered and searched cars for display
 * - `statusFilter`, `setStatusFilter` - current status filter and setter
 * - `search`, `setSearch` - current search term and setter
 * - `selectedCar`, `setSelectedCar` - currently selected car for modal editing
 * - `isModalOpen`, `setModalOpen` - modal visibility controls
 * - `carFields` - field configuration array for modals
 * - `refetchCars` - function to manually refetch the cars list
 */
export function useCarsData() {
  const carFields: FieldConfig<Automobilis>[] = [
    { name: "marke", label: "Markė", required: true },
    { name: "modelis", label: "Modelis", required: true },
    { name: "metai", label: "Metai", type: "number", required: true },
    { name: "numeris", label: "Valst. numeris", required: true },
    { name: "vin_kodas", label: "VIN kodas" },
    { name: "spalva", label: "Spalva" },
    { name: "kebulo_tipas", label: "Kėbulo tipas" },
    { name: "pavarų_deze", label: "Pavarų dėžė" },
    { name: "variklio_turis", label: "Variklio tūris", type: "number" },
    { name: "galia_kw", label: "Galia (kW)", type: "number" },
    { name: "kuro_tipas", label: "Kuro tipas" },
    { name: "rida", label: "Rida (km)", type: "number" },
    { name: "sedimos_vietos", label: "Sėdimos vietos", type: "number" },
    {
      name: "klimato_kontrole",
      label: "Klimato kontrolė",
      type: "select",
      options: [
        { value: true, label: "Taip" },
        { value: false, label: "Ne" },
      ],
    },
    {
      name: "navigacija",
      label: "Navigacija",
      type: "select",
      options: [
        { value: true, label: "Taip" },
        { value: false, label: "Ne" },
      ],
    },
    {
      name: "kaina_parai",
      label: "Kaina parai (€)",
      type: "number",
      required: true,
    },
    {
      name: "automobilio_statusas",
      label: "Būsena",
      type: "select",
      options: [
        { value: "laisvas", label: "Laisvas" },
        { value: "isnuomotas", label: "Išnuomotas" },
        { value: "servise", label: "Servise" },
      ],
      required: true,
    },
    {
      name: "technikines_galiojimas",
      label: "Technikinės galiojimas",
      type: "date",
    },
    {
      name: "dabartine_vieta_id",
      label: "Vietos ID",
      type: "number",
    },
    {
      name: "pastabos",
      label: "Pastabos",
      type: "textarea",
    },
  ];

  const {
    data: automobiliai = [],
    isLoading,
    refetch: refetchCars,
  } = useGetAllCarsQuery();

  const [statusFilter, setStatusFilter] = useState("visi");
  const [search, setSearch] = useState("");
  const [selectedCar, setSelectedCar] = useState<Automobilis | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const filtered = automobiliai.filter((a) => {
    const matchesStatus =
      statusFilter === "visi" || a.automobilio_statusas === statusFilter;
    const matchesSearch = `${a.marke} ${a.modelis} ${a.numeris}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return {
    automobiliai,
    isLoading,
    filtered,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    selectedCar,
    setSelectedCar,
    isModalOpen,
    setModalOpen,
    carFields,
    refetchCars,
  };
}
