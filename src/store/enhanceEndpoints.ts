import { carRentalApi } from "./carRentalApi";

/**
 * Enhances the base `carRentalApi` with tags for cache management and additional endpoints.
 *
 * - Tags enable automatic cache invalidation and refetching.
 * - Useful for consistency between mutations and queries.
 */
export const extendedCarRentalApi = carRentalApi.enhanceEndpoints({
  /**
   * Declare tag types used for cache invalidation across the API.
   */
  addTagTypes: ["Cars", "Support"],

  /**
   * Extend or modify individual endpoint behavior.
   */
  endpoints: {
    // === Cars ===

    /**
     * GET /cars - Provides car data with cache tag "Cars".
     */
    getAllCars: { providesTags: ["Cars"] },

    /**
     * POST /cars - Invalidates "Cars" to trigger refetch after creation.
     */
    createCar: { invalidatesTags: ["Cars"] },

    /**
     * PUT /cars/:id - Invalidates "Cars" to update the cache after editing.
     */
    updateCar: { invalidatesTags: ["Cars"] },

    /**
     * DELETE /cars/:id - Invalidates "Cars" to remove deleted car from cache.
     */
    deleteCar: { invalidatesTags: ["Cars"] },

    // === Support Requests ===

    /**
     * GET /support - Provides support tickets with "Support" tag.
     */
    getAllSupports: { providesTags: ["Support"] },

    /**
     * PATCH /support/:id - Respond to a support query.
     *
     * Invalidates the "Support" cache so the updated ticket appears immediately.
     *
     * @param id - Support ticket ID
     * @param atsakymas - Response message
     * @param darbuotojo_id - Optional employee ID replying to the ticket
     */
    answerToSupport: {
      invalidatesTags: ["Support"],
      query: ({
        id,
        atsakymas,
        darbuotojo_id = 0,
      }: {
        id: number;
        atsakymas: string;
        darbuotojo_id?: number;
      }) => ({
        url: `/api/v1/support/${id}`,
        method: "PATCH",
        body: {
          atsakymas,
          atsakymo_data: new Date().toISOString(),
          darbuotojo_id,
        },
      }),
    },
  },
});

/**
 * Auto-generated hooks from enhanced API.
 *
 * These allow calling queries/mutations directly in components or hooks.
 */
export const {
  // Cars
  useGetAllCarsQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,

  // Support
  useGetAllSupportsQuery,
  useAnswerToSupportMutation,
} = extendedCarRentalApi;
