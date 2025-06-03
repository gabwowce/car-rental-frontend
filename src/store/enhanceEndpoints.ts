import { carRentalApi } from "./carRentalApi";

/** Visi papildomi (ar patobulinti) endpointai - su tagʼais */
export const extendedCarRentalApi = carRentalApi.enhanceEndpoints({
  addTagTypes: ["Cars", "Support"],
  endpoints: {
    /* ---------- Cars ---------- */
    getAllCars: { providesTags: ["Cars"] },
    createCar: { invalidatesTags: ["Cars"] },
    updateCar: { invalidatesTags: ["Cars"] },
    deleteCar: { invalidatesTags: ["Cars"] },

    /* ---------- Pagalbos užklausos ---------- */
    getAllSupports: { providesTags: ["Support"] },

    /** Atsakyti į užklausą  PATCH /support/{id} */
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

/* Eksportuojame hookʼus */
export const {
  /* Cars */
  useGetAllCarsQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,

  /* Support */
  useGetAllSupportsQuery,
  useAnswerToSupportMutation,
} = extendedCarRentalApi;
