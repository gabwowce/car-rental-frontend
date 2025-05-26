import { useGetAllCarsQuery } from "@/store/carRentalApi";
import { useState } from "react";
import EntityModal, { FieldConfig } from "@/app/components/modals/EntityModal";

type Automobilis = NonNullable<
  ReturnType<typeof useGetAllCarsQuery>["data"]
>[number];
export function useCarsData() {
  const carFields: FieldConfig<Automobilis>[] = [
    { name: "numeris", label: "Numeris" },
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
      name: "kaina_parai",
      label: "Kaina (€/para)",
      type: "number",
      format: (v) => `${v} €`,
    },
    { name: "sedimos_vietos", label: "Sėdimos vietos", type: "number" },
  ];

  const { data: automobiliai = [], isLoading } = useGetAllCarsQuery();

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
  };
}
