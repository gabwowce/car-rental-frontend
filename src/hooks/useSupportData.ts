import {
  useGetAllSupportsQuery,
  useAnswerToSupportMutation,
} from "@/store/enhanceEndpoints";

/** Viena vieta visai pagalbos užklausų logikai */
export const useSupportData = () => {
  /* Užklausų sąrašas */
  const { data: supports = [], isLoading, refetch } = useGetAllSupportsQuery();

  /* Atsakymo mutacija */
  const [answerToSupport, { isLoading: isAnswering }] =
    useAnswerToSupportMutation();

  /** Atsakyti į konkrečią užklausą ir refetch’inti lentelę */
  const answer = async (id: number, atsakymas: string) => {
    await answerToSupport({ id, atsakymas }).unwrap();
    await refetch();
  };

  return {
    supports,
    isLoading: isLoading || isAnswering,
    answer,
  };
};
