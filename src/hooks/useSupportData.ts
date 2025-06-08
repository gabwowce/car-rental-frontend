/**
 * useSupportData
 *
 * Custom React hook to manage client support request data for the AutoRent system.
 * Provides the ability to fetch all support queries and reply to them via mutation.
 *
 * ---
 * ## Features:
 * - Retrieves all support tickets using `useGetAllSupportsQuery`
 * - Allows submitting an answer to a support request with `useAnswerToSupportMutation`
 * - Automatically refreshes data after replying
 *
 * ---
 * ## Returns:
 * ```ts
 * {
 *   supports: SupportOut[];                     // List of support queries
 *   isLoading: boolean;                         // Combined loading state
 *   answer: (id: number, atsakymas: string) => Promise<void>; // Reply to a support query
 * }
 * ```
 *
 * ---
 * ## Example Usage:
 * ```tsx
 * const { supports, isLoading, answer } = useSupportData();
 *
 * <button onClick={() => answer(5, "Thank you, your issue is resolved.")}>
 *   Reply
 * </button>
 * ```
 */

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
