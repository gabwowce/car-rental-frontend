import { useGetAllCarsQuery } from "@/store/carRentalApi";
import { useState } from "react";

type Automobilis = NonNullable<
  ReturnType<typeof useGetAllCarsQuery>["data"]
>[number];
export function useCarsData() {
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
  };
}
