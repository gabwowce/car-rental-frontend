import {
  useGetAllSupportsQuery,
  useAnswerToSupportMutation,
} from "@/store/enhanceEndpoints";

/**
 * Custom hook for managing client support request data in the AutoRent system.
 *
 * Fetches all support requests and allows replying to them with automatic refresh.
 */
export const useSupportData = () => {
  /**
   * Fetches the list of all support queries.
   * Defaults to empty array if data is undefined.
   */
  const { data: supports = [], isLoading, refetch } = useGetAllSupportsQuery();

  /**
   * Mutation hook to answer a support query.
   */
  const [answerToSupport, { isLoading: isAnswering }] =
    useAnswerToSupportMutation();

  /**
   * Submits a reply to a specific support ticket and triggers a refetch.
   *
   * @param id - The ID of the support query to answer
   * @param atsakymas - The response text to send
   */
  const answer = async (id: number, atsakymas: string) => {
    await answerToSupport({ id, atsakymas }).unwrap();
    await refetch();
  };

  return {
    supports, // All support queries
    isLoading: isLoading || isAnswering, // Combined loading state
    answer, // Function to send a response
  };
};
