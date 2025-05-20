import { baseApi as api } from "./baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginApiV1LoginPost: build.mutation<
      LoginApiV1LoginPostApiResponse,
      LoginApiV1LoginPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/login`,
        method: "POST",
        body: queryArg.loginRequest,
      }),
    }),
    registerApiV1RegisterPost: build.mutation<
      RegisterApiV1RegisterPostApiResponse,
      RegisterApiV1RegisterPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/register`,
        method: "POST",
        body: queryArg.registerRequest,
      }),
    }),
    logoutApiV1LogoutPost: build.mutation<
      LogoutApiV1LogoutPostApiResponse,
      LogoutApiV1LogoutPostApiArg
    >({
      query: () => ({ url: `/api/v1/logout`, method: "POST" }),
    }),
    meApiV1MeGet: build.query<MeApiV1MeGetApiResponse, MeApiV1MeGetApiArg>({
      query: () => ({ url: `/api/v1/me` }),
    }),
    changePasswordApiV1ChangePasswordPost: build.mutation<
      ChangePasswordApiV1ChangePasswordPostApiResponse,
      ChangePasswordApiV1ChangePasswordPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/change-password`,
        method: "POST",
        body: queryArg.changePasswordRequest,
      }),
    }),
    getEmployeesApiV1EmployeesGet: build.query<
      GetEmployeesApiV1EmployeesGetApiResponse,
      GetEmployeesApiV1EmployeesGetApiArg
    >({
      query: () => ({ url: `/api/v1/employees/` }),
    }),
    getEmployeeApiV1EmployeesEmployeeIdGet: build.query<
      GetEmployeeApiV1EmployeesEmployeeIdGetApiResponse,
      GetEmployeeApiV1EmployeesEmployeeIdGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employees/${queryArg.employeeId}`,
      }),
    }),
    updateEmployeeApiV1EmployeesEmployeeIdPut: build.mutation<
      UpdateEmployeeApiV1EmployeesEmployeeIdPutApiResponse,
      UpdateEmployeeApiV1EmployeesEmployeeIdPutApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employees/${queryArg.employeeId}`,
        method: "PUT",
        body: queryArg.employeeUpdate,
      }),
    }),
    deleteEmployeeApiV1EmployeesEmployeeIdDelete: build.mutation<
      DeleteEmployeeApiV1EmployeesEmployeeIdDeleteApiResponse,
      DeleteEmployeeApiV1EmployeesEmployeeIdDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employees/${queryArg.employeeId}`,
        method: "DELETE",
      }),
    }),
    getAllCarsApiV1CarsGet: build.query<
      GetAllCarsApiV1CarsGetApiResponse,
      GetAllCarsApiV1CarsGetApiArg
    >({
      query: () => ({ url: `/api/v1/cars/` }),
    }),
    createCarApiV1CarsPost: build.mutation<
      CreateCarApiV1CarsPostApiResponse,
      CreateCarApiV1CarsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/cars/`,
        method: "POST",
        body: queryArg.carCreate,
      }),
    }),
    getCarApiV1CarsCarIdGet: build.query<
      GetCarApiV1CarsCarIdGetApiResponse,
      GetCarApiV1CarsCarIdGetApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/cars/${queryArg.carId}` }),
    }),
    updateCarApiV1CarsCarIdPut: build.mutation<
      UpdateCarApiV1CarsCarIdPutApiResponse,
      UpdateCarApiV1CarsCarIdPutApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/cars/${queryArg.carId}`,
        method: "PUT",
        body: queryArg.carUpdate,
      }),
    }),
    deleteCarApiV1CarsCarIdDelete: build.mutation<
      DeleteCarApiV1CarsCarIdDeleteApiResponse,
      DeleteCarApiV1CarsCarIdDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/cars/${queryArg.carId}`,
        method: "DELETE",
      }),
    }),
    updateCarStatusApiV1CarsCarIdStatusPatch: build.mutation<
      UpdateCarStatusApiV1CarsCarIdStatusPatchApiResponse,
      UpdateCarStatusApiV1CarsCarIdStatusPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/cars/${queryArg.carId}/status`,
        method: "PATCH",
        body: queryArg.carStatusUpdate,
      }),
    }),
    searchCarsApiV1CarsSearchGet: build.query<
      SearchCarsApiV1CarsSearchGetApiResponse,
      SearchCarsApiV1CarsSearchGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/cars/search`,
        params: {
          marke: queryArg.marke,
          modelis: queryArg.modelis,
          spalva: queryArg.spalva,
          status: queryArg.status,
          kuro_tipas: queryArg.kuroTipas,
          metai: queryArg.metai,
          sedimos_vietos: queryArg.sedimosVietos,
        },
      }),
    }),
    getAllReservationsApiV1ReservationsGet: build.query<
      GetAllReservationsApiV1ReservationsGetApiResponse,
      GetAllReservationsApiV1ReservationsGetApiArg
    >({
      query: () => ({ url: `/api/v1/reservations/` }),
    }),
    createReservationApiV1ReservationsPost: build.mutation<
      CreateReservationApiV1ReservationsPostApiResponse,
      CreateReservationApiV1ReservationsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reservations/`,
        method: "POST",
        body: queryArg.reservationCreate,
      }),
    }),
    getReservationApiV1ReservationsRezervacijosIdGet: build.query<
      GetReservationApiV1ReservationsRezervacijosIdGetApiResponse,
      GetReservationApiV1ReservationsRezervacijosIdGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reservations/${queryArg.rezervacijosId}`,
      }),
    }),
    deleteReservationApiV1ReservationsRezervacijosIdDelete: build.mutation<
      DeleteReservationApiV1ReservationsRezervacijosIdDeleteApiResponse,
      DeleteReservationApiV1ReservationsRezervacijosIdDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reservations/${queryArg.rezervacijosId}`,
        method: "DELETE",
      }),
    }),
    getLatestReservationsApiV1ReservationsLatestGet: build.query<
      GetLatestReservationsApiV1ReservationsLatestGetApiResponse,
      GetLatestReservationsApiV1ReservationsLatestGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reservations/latest`,
        params: {
          limit: queryArg.limit,
        },
      }),
    }),
    searchReservationsApiV1ReservationsSearchGet: build.query<
      SearchReservationsApiV1ReservationsSearchGetApiResponse,
      SearchReservationsApiV1ReservationsSearchGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reservations/search`,
        params: {
          kliento_id: queryArg.klientoId,
          automobilio_id: queryArg.automobilioId,
          nuo: queryArg.nuo,
          iki: queryArg.iki,
          busena: queryArg.busena,
        },
      }),
    }),
    getAllOrdersApiV1OrdersGet: build.query<
      GetAllOrdersApiV1OrdersGetApiResponse,
      GetAllOrdersApiV1OrdersGetApiArg
    >({
      query: () => ({ url: `/api/v1/orders/` }),
    }),
    createOrderApiV1OrdersPost: build.mutation<
      CreateOrderApiV1OrdersPostApiResponse,
      CreateOrderApiV1OrdersPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/orders/`,
        method: "POST",
        body: queryArg.orderCreate,
      }),
    }),
    getOrderApiV1OrdersUzsakymoIdGet: build.query<
      GetOrderApiV1OrdersUzsakymoIdGetApiResponse,
      GetOrderApiV1OrdersUzsakymoIdGetApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/orders/${queryArg.uzsakymoId}` }),
    }),
    deleteOrderApiV1OrdersUzsakymoIdDelete: build.mutation<
      DeleteOrderApiV1OrdersUzsakymoIdDeleteApiResponse,
      DeleteOrderApiV1OrdersUzsakymoIdDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/orders/${queryArg.uzsakymoId}`,
        method: "DELETE",
      }),
    }),
    getOrderStatsByStatusApiV1OrdersStatsByStatusGet: build.query<
      GetOrderStatsByStatusApiV1OrdersStatsByStatusGetApiResponse,
      GetOrderStatsByStatusApiV1OrdersStatsByStatusGetApiArg
    >({
      query: () => ({ url: `/api/v1/orders/stats/by-status` }),
    }),
    getOrdersByClientApiV1OrdersByClientKlientoIdGet: build.query<
      GetOrdersByClientApiV1OrdersByClientKlientoIdGetApiResponse,
      GetOrdersByClientApiV1OrdersByClientKlientoIdGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/orders/by-client/${queryArg.klientoId}`,
      }),
    }),
    getAllClientsApiV1ClientsGet: build.query<
      GetAllClientsApiV1ClientsGetApiResponse,
      GetAllClientsApiV1ClientsGetApiArg
    >({
      query: () => ({ url: `/api/v1/clients/` }),
    }),
    createClientApiV1ClientsPost: build.mutation<
      CreateClientApiV1ClientsPostApiResponse,
      CreateClientApiV1ClientsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/clients/`,
        method: "POST",
        body: queryArg.clientCreate,
      }),
    }),
    getClientApiV1ClientsKlientoIdGet: build.query<
      GetClientApiV1ClientsKlientoIdGetApiResponse,
      GetClientApiV1ClientsKlientoIdGetApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/clients/${queryArg.klientoId}` }),
    }),
    deleteClientApiV1ClientsKlientoIdDelete: build.mutation<
      DeleteClientApiV1ClientsKlientoIdDeleteApiResponse,
      DeleteClientApiV1ClientsKlientoIdDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/clients/${queryArg.klientoId}`,
        method: "DELETE",
      }),
    }),
    getClientOrdersApiV1ClientsKlientoIdOrdersGet: build.query<
      GetClientOrdersApiV1ClientsKlientoIdOrdersGetApiResponse,
      GetClientOrdersApiV1ClientsKlientoIdOrdersGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/clients/${queryArg.klientoId}/orders`,
      }),
    }),
    getAllSupportsApiV1SupportGet: build.query<
      GetAllSupportsApiV1SupportGetApiResponse,
      GetAllSupportsApiV1SupportGetApiArg
    >({
      query: () => ({ url: `/api/v1/support/` }),
    }),
    createSupportApiV1SupportPost: build.mutation<
      CreateSupportApiV1SupportPostApiResponse,
      CreateSupportApiV1SupportPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/support/`,
        method: "POST",
        body: queryArg.clientSupportCreate,
      }),
    }),
    getSupportApiV1SupportUzklausosIdGet: build.query<
      GetSupportApiV1SupportUzklausosIdGetApiResponse,
      GetSupportApiV1SupportUzklausosIdGetApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/support/${queryArg.uzklausosId}` }),
    }),
    answerToSupportApiV1SupportUzklausosIdPatch: build.mutation<
      AnswerToSupportApiV1SupportUzklausosIdPatchApiResponse,
      AnswerToSupportApiV1SupportUzklausosIdPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/support/${queryArg.uzklausosId}`,
        method: "PATCH",
        body: queryArg.clientSupportUpdate,
      }),
    }),
    getUnansweredSupportsApiV1SupportUnansweredGet: build.query<
      GetUnansweredSupportsApiV1SupportUnansweredGetApiResponse,
      GetUnansweredSupportsApiV1SupportUnansweredGetApiArg
    >({
      query: () => ({ url: `/api/v1/support/unanswered` }),
    }),
    getAllInvoicesApiV1InvoicesGet: build.query<
      GetAllInvoicesApiV1InvoicesGetApiResponse,
      GetAllInvoicesApiV1InvoicesGetApiArg
    >({
      query: () => ({ url: `/api/v1/invoices/` }),
    }),
    createInvoiceApiV1InvoicesPost: build.mutation<
      CreateInvoiceApiV1InvoicesPostApiResponse,
      CreateInvoiceApiV1InvoicesPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/invoices/`,
        method: "POST",
        body: queryArg.invoiceCreate,
      }),
    }),
    deleteInvoiceApiV1InvoicesInvoiceIdDelete: build.mutation<
      DeleteInvoiceApiV1InvoicesInvoiceIdDeleteApiResponse,
      DeleteInvoiceApiV1InvoicesInvoiceIdDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/invoices/${queryArg.invoiceId}`,
        method: "DELETE",
      }),
    }),
    updateStatusApiV1InvoicesInvoiceIdStatusPatch: build.mutation<
      UpdateStatusApiV1InvoicesInvoiceIdStatusPatchApiResponse,
      UpdateStatusApiV1InvoicesInvoiceIdStatusPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/invoices/${queryArg.invoiceId}/status`,
        method: "PATCH",
        body: queryArg.invoiceStatusUpdate,
      }),
    }),
    getWeatherForecastApiV1WeatherGet: build.query<
      GetWeatherForecastApiV1WeatherGetApiResponse,
      GetWeatherForecastApiV1WeatherGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/weather`,
        params: {
          city: queryArg.city,
          date: queryArg.date,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as carRentalApi };
export type LoginApiV1LoginPostApiResponse =
  /** status 200 Successful Response */ TokenResponse;
export type LoginApiV1LoginPostApiArg = {
  loginRequest: LoginRequest;
};
export type RegisterApiV1RegisterPostApiResponse =
  /** status 200 Successful Response */ any;
export type RegisterApiV1RegisterPostApiArg = {
  registerRequest: RegisterRequest;
};
export type LogoutApiV1LogoutPostApiResponse =
  /** status 200 Successful Response */ any;
export type LogoutApiV1LogoutPostApiArg = void;
export type MeApiV1MeGetApiResponse =
  /** status 200 Successful Response */ UserInfo;
export type MeApiV1MeGetApiArg = void;
export type ChangePasswordApiV1ChangePasswordPostApiResponse =
  /** status 200 Successful Response */ any;
export type ChangePasswordApiV1ChangePasswordPostApiArg = {
  changePasswordRequest: ChangePasswordRequest;
};
export type GetEmployeesApiV1EmployeesGetApiResponse =
  /** status 200 Successful Response */ EmployeeOut[];
export type GetEmployeesApiV1EmployeesGetApiArg = void;
export type GetEmployeeApiV1EmployeesEmployeeIdGetApiResponse =
  /** status 200 Successful Response */ EmployeeOut;
export type GetEmployeeApiV1EmployeesEmployeeIdGetApiArg = {
  employeeId: number;
};
export type UpdateEmployeeApiV1EmployeesEmployeeIdPutApiResponse =
  /** status 200 Successful Response */ EmployeeOut;
export type UpdateEmployeeApiV1EmployeesEmployeeIdPutApiArg = {
  employeeId: number;
  employeeUpdate: EmployeeUpdate;
};
export type DeleteEmployeeApiV1EmployeesEmployeeIdDeleteApiResponse =
  /** status 200 Successful Response */ any;
export type DeleteEmployeeApiV1EmployeesEmployeeIdDeleteApiArg = {
  employeeId: number;
};
export type GetAllCarsApiV1CarsGetApiResponse =
  /** status 200 Successful Response */ CarOut[];
export type GetAllCarsApiV1CarsGetApiArg = void;
export type CreateCarApiV1CarsPostApiResponse =
  /** status 200 Successful Response */ CarOut;
export type CreateCarApiV1CarsPostApiArg = {
  carCreate: CarCreate;
};
export type GetCarApiV1CarsCarIdGetApiResponse =
  /** status 200 Successful Response */ CarOut;
export type GetCarApiV1CarsCarIdGetApiArg = {
  carId: number;
};
export type UpdateCarApiV1CarsCarIdPutApiResponse =
  /** status 200 Successful Response */ CarOut;
export type UpdateCarApiV1CarsCarIdPutApiArg = {
  carId: number;
  carUpdate: CarUpdate;
};
export type DeleteCarApiV1CarsCarIdDeleteApiResponse =
  /** status 200 Successful Response */ any;
export type DeleteCarApiV1CarsCarIdDeleteApiArg = {
  carId: number;
};
export type UpdateCarStatusApiV1CarsCarIdStatusPatchApiResponse =
  /** status 200 Successful Response */ CarOut;
export type UpdateCarStatusApiV1CarsCarIdStatusPatchApiArg = {
  carId: number;
  carStatusUpdate: CarStatusUpdate;
};
export type SearchCarsApiV1CarsSearchGetApiResponse =
  /** status 200 Successful Response */ CarOut[];
export type SearchCarsApiV1CarsSearchGetApiArg = {
  marke?: string | null;
  modelis?: string | null;
  spalva?: string | null;
  status?: string | null;
  kuroTipas?: string | null;
  metai?: number | null;
  sedimosVietos?: number | null;
};
export type GetAllReservationsApiV1ReservationsGetApiResponse =
  /** status 200 Successful Response */ ReservationOut[];
export type GetAllReservationsApiV1ReservationsGetApiArg = void;
export type CreateReservationApiV1ReservationsPostApiResponse =
  /** status 200 Successful Response */ ReservationOut;
export type CreateReservationApiV1ReservationsPostApiArg = {
  reservationCreate: ReservationCreate;
};
export type GetReservationApiV1ReservationsRezervacijosIdGetApiResponse =
  /** status 200 Successful Response */ ReservationOut;
export type GetReservationApiV1ReservationsRezervacijosIdGetApiArg = {
  rezervacijosId: number;
};
export type DeleteReservationApiV1ReservationsRezervacijosIdDeleteApiResponse =
  /** status 200 Successful Response */ any;
export type DeleteReservationApiV1ReservationsRezervacijosIdDeleteApiArg = {
  rezervacijosId: number;
};
export type GetLatestReservationsApiV1ReservationsLatestGetApiResponse =
  /** status 200 Successful Response */ ReservationSummary[];
export type GetLatestReservationsApiV1ReservationsLatestGetApiArg = {
  limit?: number;
};
export type SearchReservationsApiV1ReservationsSearchGetApiResponse =
  /** status 200 Successful Response */ ReservationOut[];
export type SearchReservationsApiV1ReservationsSearchGetApiArg = {
  klientoId?: number | null;
  automobilioId?: number | null;
  nuo?: string | null;
  iki?: string | null;
  busena?: string | null;
};
export type GetAllOrdersApiV1OrdersGetApiResponse =
  /** status 200 Successful Response */ OrderOut[];
export type GetAllOrdersApiV1OrdersGetApiArg = void;
export type CreateOrderApiV1OrdersPostApiResponse =
  /** status 200 Successful Response */ OrderOut;
export type CreateOrderApiV1OrdersPostApiArg = {
  orderCreate: OrderCreate;
};
export type GetOrderApiV1OrdersUzsakymoIdGetApiResponse =
  /** status 200 Successful Response */ OrderOut;
export type GetOrderApiV1OrdersUzsakymoIdGetApiArg = {
  uzsakymoId: number;
};
export type DeleteOrderApiV1OrdersUzsakymoIdDeleteApiResponse =
  /** status 200 Successful Response */ any;
export type DeleteOrderApiV1OrdersUzsakymoIdDeleteApiArg = {
  uzsakymoId: number;
};
export type GetOrderStatsByStatusApiV1OrdersStatsByStatusGetApiResponse =
  /** status 200 Successful Response */ any;
export type GetOrderStatsByStatusApiV1OrdersStatsByStatusGetApiArg = void;
export type GetOrdersByClientApiV1OrdersByClientKlientoIdGetApiResponse =
  /** status 200 Successful Response */ OrderOut[];
export type GetOrdersByClientApiV1OrdersByClientKlientoIdGetApiArg = {
  klientoId: number;
};
export type GetAllClientsApiV1ClientsGetApiResponse =
  /** status 200 Successful Response */ ClientOut[];
export type GetAllClientsApiV1ClientsGetApiArg = void;
export type CreateClientApiV1ClientsPostApiResponse =
  /** status 200 Successful Response */ ClientOut;
export type CreateClientApiV1ClientsPostApiArg = {
  clientCreate: ClientCreate;
};
export type GetClientApiV1ClientsKlientoIdGetApiResponse =
  /** status 200 Successful Response */ ClientOut;
export type GetClientApiV1ClientsKlientoIdGetApiArg = {
  klientoId: number;
};
export type DeleteClientApiV1ClientsKlientoIdDeleteApiResponse =
  /** status 200 Successful Response */ any;
export type DeleteClientApiV1ClientsKlientoIdDeleteApiArg = {
  klientoId: number;
};
export type GetClientOrdersApiV1ClientsKlientoIdOrdersGetApiResponse =
  /** status 200 Successful Response */ OrderOut[];
export type GetClientOrdersApiV1ClientsKlientoIdOrdersGetApiArg = {
  klientoId: number;
};
export type GetAllSupportsApiV1SupportGetApiResponse =
  /** status 200 Successful Response */ ClientSupportOut[];
export type GetAllSupportsApiV1SupportGetApiArg = void;
export type CreateSupportApiV1SupportPostApiResponse =
  /** status 200 Successful Response */ ClientSupportOut;
export type CreateSupportApiV1SupportPostApiArg = {
  clientSupportCreate: ClientSupportCreate;
};
export type GetSupportApiV1SupportUzklausosIdGetApiResponse =
  /** status 200 Successful Response */ ClientSupportOut;
export type GetSupportApiV1SupportUzklausosIdGetApiArg = {
  uzklausosId: number;
};
export type AnswerToSupportApiV1SupportUzklausosIdPatchApiResponse =
  /** status 200 Successful Response */ ClientSupportOut;
export type AnswerToSupportApiV1SupportUzklausosIdPatchApiArg = {
  uzklausosId: number;
  clientSupportUpdate: ClientSupportUpdate;
};
export type GetUnansweredSupportsApiV1SupportUnansweredGetApiResponse =
  /** status 200 Successful Response */ ClientSupportOut[];
export type GetUnansweredSupportsApiV1SupportUnansweredGetApiArg = void;
export type GetAllInvoicesApiV1InvoicesGetApiResponse =
  /** status 200 Successful Response */ InvoiceOut[];
export type GetAllInvoicesApiV1InvoicesGetApiArg = void;
export type CreateInvoiceApiV1InvoicesPostApiResponse =
  /** status 200 Successful Response */ InvoiceOut;
export type CreateInvoiceApiV1InvoicesPostApiArg = {
  invoiceCreate: InvoiceCreate;
};
export type DeleteInvoiceApiV1InvoicesInvoiceIdDeleteApiResponse =
  /** status 200 Successful Response */ any;
export type DeleteInvoiceApiV1InvoicesInvoiceIdDeleteApiArg = {
  invoiceId: number;
};
export type UpdateStatusApiV1InvoicesInvoiceIdStatusPatchApiResponse =
  /** status 200 Successful Response */ InvoiceOut;
export type UpdateStatusApiV1InvoicesInvoiceIdStatusPatchApiArg = {
  invoiceId: number;
  invoiceStatusUpdate: InvoiceStatusUpdate;
};
export type GetWeatherForecastApiV1WeatherGetApiResponse =
  /** status 200 Successful Response */ any;
export type GetWeatherForecastApiV1WeatherGetApiArg = {
  city: string;
  date: string;
};
export type TokenResponse = {
  access_token: string;
  token_type?: string;
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type LoginRequest = {
  el_pastas: string;
  slaptazodis: string;
};
export type RegisterRequest = {
  vardas: string;
  pavarde: string;
  el_pastas: string;
  telefono_nr: string;
  pareigos: string;
  atlyginimas: number;
  isidarbinimo_data: string;
  slaptazodis: string;
};
export type UserInfo = {
  vardas: string;
  pavarde: string;
  telefono_nr: string;
  el_pastas: string;
  pareigos: string;
  isidarbinimo_data: string;
};
export type ChangePasswordRequest = {
  senas_slaptazodis: string;
  naujas_slaptazodis: string;
};
export type EmployeeOut = {
  vardas: string;
  pavarde: string;
  el_pastas: string;
  telefono_nr: string | null;
  pareigos: string;
  atlyginimas: number;
  isidarbinimo_data: string;
  darbuotojo_id: number;
  links: {
    [key: string]: any;
  }[];
};
export type EmployeeUpdate = {
  vardas?: string | null;
  pavarde?: string | null;
  el_pastas?: string | null;
  telefono_nr?: string | null;
  pareigos?: string | null;
  atlyginimas?: number | null;
  isidarbinimo_data?: string | null;
  slaptazodis?: string | null;
};
export type LocationOut = {
  vietos_id: number;
  pavadinimas: string;
  adresas: string;
  miestas: string;
};
export type CarOut = {
  marke: string;
  modelis: string;
  metai: number;
  numeris: string;
  vin_kodas: string;
  spalva: string;
  kebulo_tipas: string;
  pavarų_deze: string;
  variklio_turis: number;
  galia_kw: number;
  kuro_tipas: string;
  rida: number;
  sedimos_vietos: number;
  klimato_kontrole: boolean;
  navigacija: boolean;
  kaina_parai: number;
  automobilio_statusas: string;
  technikines_galiojimas: string;
  dabartine_vieta_id: number;
  pastabos: string | null;
  automobilio_id: number;
  lokacija: LocationOut | null;
  links: {
    [key: string]: any;
  }[];
};
export type CarCreate = {
  marke: string;
  modelis: string;
  metai: number;
  numeris: string;
  vin_kodas: string;
  spalva: string;
  kebulo_tipas: string;
  pavarų_deze: string;
  variklio_turis: number;
  galia_kw: number;
  kuro_tipas: string;
  rida: number;
  sedimos_vietos: number;
  klimato_kontrole: boolean;
  navigacija: boolean;
  kaina_parai: number;
  automobilio_statusas: string;
  technikines_galiojimas: string;
  dabartine_vieta_id: number;
  pastabos: string | null;
};
export type CarUpdate = {
  marke: string;
  modelis: string;
  metai: number;
  numeris: string;
  vin_kodas: string;
  spalva: string;
  kebulo_tipas: string;
  pavarų_deze: string;
  variklio_turis: number;
  galia_kw: number;
  kuro_tipas: string;
  rida: number;
  sedimos_vietos: number;
  klimato_kontrole: boolean;
  navigacija: boolean;
  kaina_parai: number;
  automobilio_statusas: string;
  technikines_galiojimas: string;
  dabartine_vieta_id: number;
  pastabos: string | null;
};
export type CarStatusUpdate = {
  status: string;
};
export type ReservationOut = {
  kliento_id: number;
  automobilio_id: number;
  rezervacijos_pradzia: string;
  rezervacijos_pabaiga: string;
  busena: string;
  rezervacijos_id: number;
  links: {
    [key: string]: any;
  }[];
};
export type ReservationCreate = {
  kliento_id: number;
  automobilio_id: number;
  rezervacijos_pradzia: string;
  rezervacijos_pabaiga: string;
  busena: string;
};
export type ReservationSummary = {
  rezervacijos_id: number;
  rezervacijos_pradzia: string;
  rezervacijos_pabaiga: string;
  marke: string;
  modelis: string;
  vardas: string;
  pavarde: string;
  links: {
    [key: string]: any;
  }[];
};
export type OrderOut = {
  kliento_id: number;
  automobilio_id: number;
  darbuotojo_id: number;
  nuomos_data: string;
  grazinimo_data: string;
  paemimo_vietos_id: number;
  grazinimo_vietos_id: number;
  bendra_kaina: number;
  uzsakymo_busena: string;
  turi_papildomas_paslaugas: boolean;
  uzsakymo_id: number;
  links: {
    [key: string]: any;
  }[];
};
export type OrderCreate = {
  kliento_id: number;
  automobilio_id: number;
  darbuotojo_id: number;
  nuomos_data: string;
  grazinimo_data: string;
  paemimo_vietos_id: number;
  grazinimo_vietos_id: number;
  bendra_kaina: number;
  uzsakymo_busena: string;
  turi_papildomas_paslaugas: boolean;
};
export type ClientOut = {
  vardas: string;
  pavarde: string;
  el_pastas: string;
  telefono_nr: string;
  gimimo_data: string;
  registracijos_data: string;
  bonus_taskai: number;
  kliento_id: number;
  links: {
    [key: string]: any;
  }[];
};
export type ClientCreate = {
  vardas: string;
  pavarde: string;
  el_pastas: string;
  telefono_nr: string;
  gimimo_data: string;
  registracijos_data: string;
  bonus_taskai: number;
};
export type ClientSupportOut = {
  kliento_id: number;
  darbuotojo_id: number;
  tema: string;
  pranesimas: string;
  atsakymas?: string | null;
  pateikimo_data: string;
  atsakymo_data?: string | null;
  uzklausos_id: number;
  links: {
    [key: string]: any;
  }[];
};
export type ClientSupportCreate = {
  kliento_id: number;
  darbuotojo_id: number;
  tema: string;
  pranesimas: string;
  atsakymas?: string | null;
  pateikimo_data: string;
  atsakymo_data?: string | null;
};
export type ClientSupportUpdate = {
  atsakymas: string | null;
  atsakymo_data: string | null;
};
export type InvoiceOut = {
  order_id: number;
  total: number;
  invoice_date: string;
  invoice_id: number;
  kliento_id: number;
  status: string;
  client_first_name: string;
  client_last_name: string;
  links: {
    [key: string]: any;
  }[];
};
export type InvoiceCreate = {
  order_id: number;
  total: number;
  invoice_date: string;
};
export type InvoiceStatusUpdate = {
  status: string;
};
export const {
  useLoginApiV1LoginPostMutation,
  useRegisterApiV1RegisterPostMutation,
  useLogoutApiV1LogoutPostMutation,
  useMeApiV1MeGetQuery,
  useChangePasswordApiV1ChangePasswordPostMutation,
  useGetEmployeesApiV1EmployeesGetQuery,
  useGetEmployeeApiV1EmployeesEmployeeIdGetQuery,
  useUpdateEmployeeApiV1EmployeesEmployeeIdPutMutation,
  useDeleteEmployeeApiV1EmployeesEmployeeIdDeleteMutation,
  useGetAllCarsApiV1CarsGetQuery,
  useCreateCarApiV1CarsPostMutation,
  useGetCarApiV1CarsCarIdGetQuery,
  useUpdateCarApiV1CarsCarIdPutMutation,
  useDeleteCarApiV1CarsCarIdDeleteMutation,
  useUpdateCarStatusApiV1CarsCarIdStatusPatchMutation,
  useSearchCarsApiV1CarsSearchGetQuery,
  useGetAllReservationsApiV1ReservationsGetQuery,
  useCreateReservationApiV1ReservationsPostMutation,
  useGetReservationApiV1ReservationsRezervacijosIdGetQuery,
  useDeleteReservationApiV1ReservationsRezervacijosIdDeleteMutation,
  useGetLatestReservationsApiV1ReservationsLatestGetQuery,
  useSearchReservationsApiV1ReservationsSearchGetQuery,
  useGetAllOrdersApiV1OrdersGetQuery,
  useCreateOrderApiV1OrdersPostMutation,
  useGetOrderApiV1OrdersUzsakymoIdGetQuery,
  useDeleteOrderApiV1OrdersUzsakymoIdDeleteMutation,
  useGetOrderStatsByStatusApiV1OrdersStatsByStatusGetQuery,
  useGetOrdersByClientApiV1OrdersByClientKlientoIdGetQuery,
  useGetAllClientsApiV1ClientsGetQuery,
  useCreateClientApiV1ClientsPostMutation,
  useGetClientApiV1ClientsKlientoIdGetQuery,
  useDeleteClientApiV1ClientsKlientoIdDeleteMutation,
  useGetClientOrdersApiV1ClientsKlientoIdOrdersGetQuery,
  useGetAllSupportsApiV1SupportGetQuery,
  useCreateSupportApiV1SupportPostMutation,
  useGetSupportApiV1SupportUzklausosIdGetQuery,
  useAnswerToSupportApiV1SupportUzklausosIdPatchMutation,
  useGetUnansweredSupportsApiV1SupportUnansweredGetQuery,
  useGetAllInvoicesApiV1InvoicesGetQuery,
  useCreateInvoiceApiV1InvoicesPostMutation,
  useDeleteInvoiceApiV1InvoicesInvoiceIdDeleteMutation,
  useUpdateStatusApiV1InvoicesInvoiceIdStatusPatchMutation,
  useGetWeatherForecastApiV1WeatherGetQuery,
} = injectedRtkApi;
