// hooks/useSupportData.ts
import {
  useGetAllSupportsQuery,
  useAnswerToSupportMutation,
} from "@/store/carRentalApi";

/** Susičiaupiame visą API logiką vienoje vietoje */
export const useSupportData = () => {
  const { data: supports = [], isLoading, refetch } = useGetAllSupportsQuery();

  const [answerToSupport, { isLoading: isAnswering }] =
    useAnswerToSupportMutation();

  const answer = async (id: number, atsakymas: string) => {
    await answerToSupport({ id, atsakymas }).unwrap();
    refetch(); // iškart atnaujiname lentelę
  };

  return {
    supports,
    isLoading: isLoading || isAnswering,
    answer,
  };
};
