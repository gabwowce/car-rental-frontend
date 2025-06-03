import { useUpdateCarMutation } from "@/store/carRentalApi";
import { useGetAllCarsQuery } from "@/store/enhanceEndpoints";
import { useState } from "react";
import EntityModal, { FieldConfig } from "@/app/components/modals/EntityModal";

type Automobilis = NonNullable<
  ReturnType<typeof useGetAllCarsQuery>["data"]
>[number];
export function useCarsData() {
  const carFields: FieldConfig<Automobilis>[] = [
    { name: "marke", label: "Markė" },
    { name: "modelis", label: "Modelis" },
    { name: "metai", label: "Metai", type: "number" },
    { name: "numeris", label: "Valst. numeris" },
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
    { name: "kaina_parai", label: "Kaina parai (€)", type: "number" },
    {
      name: "automobilio_statusas",
      label: "Būsena",
      type: "select",
      options: [
        { value: "laisvas", label: "Laisvas" },
        { value: "isnuomotas", label: "Išnuomotas" },
        { value: "servise", label: "Servise" },
      ],
    },
    {
      name: "technikines_galiojimas",
      label: "Technikinės galiojimas",
      type: "text", // arba "date" jei naudojamas datepicker
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
