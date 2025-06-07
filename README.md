# 🚗 Car‑Rental Frontend (Next.js 15 + RTK Query)

Interactive admin UI for the **Car‑Rental System API**.
Built with **Next 13/14/15 App Router**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit + RTK‑Query**, **Leaflet** & **Recharts**.
Open demo: https://car-rental-frontend-v2.vercel.app/

---

## ✨ Key Features

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

## 🖇️ Repository layout (partial)

```
src/
├── app/                # Next pages (App Router)
│   ├── layout.tsx      # global fonts + ClientProvider (Redux)
│   ├── login/          # auth UI
│   ├── dashboard/      # charts & stats
│   ├── cars/           # car CRUD + Leaflet map
│   └── ...
├── components/         # reusable UI (Table, Modals, Stats cards …)
├── hooks/              # typed selector hooks (e.g. useCarsData.ts)
├── store/              # Redux store + RTK‑Query slices
│   ├── baseApi.js      # fetchBaseQuery with auth header
│   └── carRentalApi.ts # **AUTO‑GENERATED** from OpenAPI
└── globals.css / tailwind.config.js
```

---

## 🚀 Quick Start

> **Prerequisites:** Node ≥ 20, pnpm / npm / yarn.

```bash
# 1. clone
git clone https://github.com/gabwowce/car-rental-frontend.git
cd car‑rental‑frontend

# 2. install deps (uses package.json above)
npm install    # or npm i / yarn

# 3. dev server
npm dev        # open http://localhost:3000

```

### GitHub Pages deployment

1. `homepage` is set in **package.json**.
2. `next build` → `next export` not needed (static pages + client JS).
3. Push to `gh-pages` branch via GitHub Action (see `.github/workflows/deploy.yml`).

---

## 🛠️ Generated RTK‑Query hooks

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

## 🌍 Maps & Geocoding

- `MapComponent` renders Leaflet map.
- Coordinates:

  - Directly from car DB → `latitude/longitude` **or**
  - Live ‑ via `useGeoCodeMutation` → calls backend `/api/v1/geocode` (OpenCage).

- In‑memory cache prevents redundant requests across page switches.

---

## 📊 Charts

- `BarChartBox` – Recharts `<BarChart>` for order status counts.
- `PieChartBox` – Recharts `<PieChart>` for car availability breakdown.

---

## 🔐 Auth Flow (frontend)

1. `login` page calls `useLoginMutation`
2. token saved to `localStorage` (`useAuthToken`)
3. `baseApi.fetchBaseQuery` attaches `Authorization: Bearer <token>` header automatically.
4. `middleware.ts` redirects unauthenticated users to `/login`.

---

## 🏷️ Tailwind & Design System

- Tailwind 4 – utility classes + `global.css` reset.
- Headless UI + React‑Icons for primitives.
- Custom `StatCard`, `ActionButtons`, `DataTable`, `Modal` components ensure consistent look.

---

## 📦 Project Scripts

| Command             | What it does                            |
| ------------------- | --------------------------------------- |
| `pnpm dev`          | Start dev server on **localhost:3000**  |
| `pnpm build`        | Production build (`.next/`)             |
| `pnpm start`        | Start built app (`NODE_ENV=production`) |
| `pnpm lint`         | ESLint (Next preset)                    |
| `pnpm api:generate` | Regenerate RTK‑Query hooks from OpenAPI |

---

## 🤝 Contributing

1. Fork → `git clone`
2. `git checkout -b feature/<name>`
3. Commit ‑ conventional messages (`feat:`, `fix:` …)
4. PR → squash & merge

---

## 📄 License

MIT
