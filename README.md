# AutoRent Frontend (Next.js 15 + RTK Query)

Interactive admin UI for the **Car‑Rental System API**.
Built with **Next 13/14/15 App Router**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit + RTK‑Query**, **Leaflet** & **Recharts**.
Open demo: https://car-rental-frontend-v2.vercel.app/

---

[![Docs](https://img.shields.io/badge/Docs-AutoRent-blue?logo=githubpages)](https://gabwowce.github.io/car-rental-frontend/)  
Interactive admin UI for the **AutoRent** (car-rental) back-end API.

## Key Features

| Feature                 | Details                                                                         |
| ----------------------- | ------------------------------------------------------------------------------- |
| **Modern stack**        | React 19 + Next 15 App Router (`app/` dir)                                      |
| **State/Data**          | Redux Toolkit Store + RTK‑Query auto‑generated hooks (`/store/carRentalApi.ts`) |
| **Charts**              | Recharts (Bar & Pie) for dashboard analytics                                    |
| **Maps**                | Leaflet + react‑leaflet (car locations)                                         |
| **Auth**                | JWT token persisted in `localStorage` (`useAuthToken` hook)                     |
| **Lazy data hooks**     | \~40 auto‑generated hooks (see below) cover all backend endpoints               |
| **Client‑side routing** | Protected routes with middleware (`src/middleware.ts`)                          |
| \*_Deployment_          | GitHub Pages (`homepage` field) or any Node host                                |

---

## Repository layout (partial)

```
src/
├── app/                    # Next.js App Router pages
│   ├── cars/              # Car CRUD (create, edit, list)
│   ├── clients/           # Client CRUD & orders
│   ├── components/        # Shared UI components (modals, tables, etc.)
│   │   └── modals/        # Reusable modal components
│   ├── guards/            # Route protection (if any)
│   ├── invoices/          # Invoice list / management
│   ├── login/             # Login screen
│   ├── orders/            # Orders dashboard
│   ├── profile/           # User profile
│   ├── providers/         # Providers (e.g. Redux, themes)
│   ├── reservations/      # Reservation handling
│   ├── support/           # Client support & messages
│   ├── layout.tsx         # App shell: sidebar, fonts, Redux <Provider/>
│   ├── page.tsx           # Dashboard (main landing page)
│   └── globals.css        # Tailwind reset & base styles
├── hooks/                 # Custom hooks (e.g. useClientsData)
├── store/                 # Redux Toolkit store + RTK Query API
│   └── carRentalApi.ts    # **AUTO‑GENERATED** RTK hooks from OpenAPI
├── fakeData.tsx           # Static demo/test data
├── middleware.ts          # Route auth middleware (Next.js)
└── tailwind.config.js     # Tailwind CSS config
```

---

## Quick Start

> **Prerequisites:** Node ≥ 20, pnpm / npm / yarn.

```bash
# 1. clone
git clone https://github.com/gabwowce/car-rental-frontend.git
cd car‑rental‑frontend

# 2. install deps (uses package.json above)
npm install    # or npm i / yarn

# 3. dev server
npx next dev        # open http://localhost:3000

```

## Generated RTK‑Query hooks

```ts
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useMeApiV1MeGetQuery,
  useChangePasswordMutation,
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetAllCarsQuery,
  useCreateCarMutation,
  useGetCarByIdQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useUpdateCarStatusMutation,
  useSearchCarsQuery,
  useGetAllReservationsQuery,
  useCreateReservationMutation,
  useGetReservationByIdQuery,
  useDeleteReservationMutation,
  useGetLatestReservationsQuery,
  useSearchReservationsQuery,
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useGetOrderStatsByStatusQuery,
  useGetOrderByClientQuery,
  useGetAllClientsQuery,
  useCreateClientMutation,
  useGetClientByIdQuery,
  useDeleteClientMutation,
  useGetClientOrderQuery,
  useGetAllSupportsQuery,
  useCreateSupportMutation,
  useGetSupportQuery,
  useAnswerToSupportMutation,
  useGetUnansweredSupportsQuery,
  useGetAllInvoicesQuery,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useUpdateStatusMutation,
  useGetWeatherForecastQuery,
  useGeoCodeMutation,
} from "@/store/carRentalApi";
```

_Hooks are auto‑regenerated via_ **`rtk-query-codegen-openapi`** (see `npm run api:generate`).

---

## Maps & Geocoding

- `MapComponent` renders Leaflet map.
- Coordinates:

  - Directly from car DB → `latitude/longitude` **or**
  - Live ‑ via `useGeoCodeMutation` → calls backend `/api/v1/geocode` (OpenCage).

- In‑memory cache prevents redundant requests across page switches.

---

## Charts

- `BarChartBox` – Recharts `<BarChart>` for order status counts.
- `PieChartBox` – Recharts `<PieChart>` for car availability breakdown.

---

## Auth Flow (frontend)

1. `login` page calls `useLoginMutation`
2. token saved to `localStorage` (`useAuthToken`)
3. `baseApi.fetchBaseQuery` attaches `Authorization: Bearer <token>` header automatically.
4. `middleware.ts` redirects unauthenticated users to `/login`.

---

## Tailwind & Design System

- Tailwind 4 – utility classes + `global.css` reset.
- Headless UI + React‑Icons for primitives.
- Custom `StatCard`, `ActionButtons`, `DataTable`, `Modal` components ensure consistent look.

---

## Contributing

1. Fork → `git clone`
2. `git checkout -b feature/<name>`
3. Commit ‑ conventional messages (`feat:`, `fix:` …)
4. PR → squash & merge

---
